# Astro MIE Material Design System

本文档定义 `astro_blog` 接下来向 Material 3 Expressive / Material You 靠拢时的设计边界和实现顺序。目标不是把主题改成 Material Web 组件示例站，而是把 Material 的色彩、状态、动效、形状和交互逻辑变成博客主题的基础语言。

## 设计目标

- 公开博客优先服务长文阅读、文章发现和媒体展示。
- Material 3 Expressive 是视觉和交互基础：动态色彩、明确状态层、柔和但有弹性的 motion、可变布局、清晰的 shape/elevation 层级。
- Material Web 作为标准组件和交互行为的来源，但必须通过本主题自己的封装、token 和 CSS 变量接入。
- 自定义阅读组件可以强于通用组件库，包括文章 hero、目录、阅读进度、媒体块、搜索、滚动条。
- 设计语言需要能被未来的 `blog_studio` 后台复用，但博客阅读体验和后台工作台密度不同，不能强行共用页面布局。

## 分层

```text
Material semantic foundation
  --md-sys-color-*
  --md-sys-shape-*
  --md-sys-motion-*
  --md-sys-elevation-*
  state-layer tokens

Astro MIE theme tokens
  --surface / --primary / --radius-* / --shadow-*
  article/post dynamic aliases
  reading and media layout tokens

Runtime components
  Material Web registration and wrapped usage
  custom reading primitives
  custom scroll system
```

现阶段保留已有 `--surface`、`--primary` 等主题变量，同时补齐 `--md-sys-*` 语义别名。这样旧 CSS 不需要一次性重写，Material Web 组件也可以读到标准 token。

## 动态色彩

动态色彩分三级：

1. 站点级 seed：默认主题色来自站点配置和 `tokens.css`。
2. 文章级 seed：优先使用 frontmatter 的 `themeColor`，映射到 `--post-theme` 和文章局部的 Material 动态别名。
3. 发现页 seed：tag、category、series、section 从稳定字符串派生 seed，不要求内容作者为每个 taxonomy 手写颜色。
4. 媒体级 seed：后续可从封面图/背景图提取主色，作为没有显式 `themeColor` 时的候选。

原则：

- 文章色只影响当前文章 hero、目录、进度、链接、分页和相关文章，不污染全站导航的稳定识别。
- taxonomy/section 的派生色只影响对应 chip/card，不覆盖全站或文章上下文。
- 暗色模式不能只反转亮度，需要保留 tonal container、outline、state layer 的层级。
- `themeColor` 是内容级字段，不应变成主题专用的魔法文件名规则。

## Material Web 使用原则

Material Web 的使用路径是“注册、封装、逐步替换”：

- 第一阶段注册 `@material/web/ripple/ripple.js`，把 ripple 用在导航和关键按钮的状态反馈上。
- 第二阶段为按钮、图标按钮、chip、dialog、tabs、menu、switch、text field 建立 Astro/React 包装层。
- 第三阶段再判断哪些已有自定义组件值得替换成 Material Web，哪些应该保留为博客专用组件。

不要在页面模板里随意散落原始 `<md-*>` 组件。它们需要经过主题 token、尺寸、状态、可访问性和 SSR 行为验证。
当前规则是：静态 Astro 模板通过 `components/material/Ripple.astro` 输出 ripple；运行时渲染的搜索结果用 `data-mie-ripple` 标记，再由脚本插入 `<md-ripple>`。

## 布局与 motion

- 首页、列表页、文章页保留不同的信息密度，不用一套卡片布局覆盖所有页面。
- Hero、卡片、目录、搜索、主题切换继续使用 shared transition 和 view transition，但 motion 必须解释状态变化。
- 所有 motion 遵守 `prefers-reduced-motion`。
- 小屏优先保证标题、操作按钮、目录和媒体不重叠，不用 viewport width 缩放字体。

## 自绘滚动条

滚动条是主题组件，不只是浏览器装饰。

目标：

- JS 可用时隐藏原生滚动条，显示主题自绘滚动条。
- 保留原生滚动行为：滚轮、触摸、键盘、焦点滚动和浏览器定位仍然由页面负责。
- 使用固定 overlay rail，避免原生滚动条出现/消失导致页面宽度变化，尤其避免 dialog/modal 打开时跳变。
- 文章页滚动条可以显示标题 marker，辅助长文定位。
- 无 JS 或异常时退回原生滚动条，并使用 `scrollbar-gutter: stable both-edges` 减少宽度跳变。

实现约束：

- 第一版使用 DOM rail/thumb/marker；Canvas 版本可以等交互复杂后再评估。
- 用 `ResizeObserver`、`scroll` + `requestAnimationFrame` 更新状态，不用 MutationObserver 盲目监听全文。
- 拖动 thumb 时直接同步 scrollTop，不做缓动；普通滚动和 thumb 显隐可以有轻量过渡。
- pointer hot zone 要大于可见 thumb，但不能遮挡正文交互。
- `prefers-reduced-motion` 下禁用非必要过渡。

## 当前实现状态

- `@material/web` 已作为依赖接入。
- `@material/material-color-utilities` 已作为依赖接入，文章 `themeColor` 会生成 light/dark 两套 Material dynamic color roles。
- `MaterialWeb.astro` 注册 `md-ripple`、Material button、filled tonal icon button 和 assist chip。
- `components/material/Ripple.astro` 是静态模板使用 ripple 的统一封装，页面和普通组件不再直接写裸 `<md-ripple>`。
- `components/material/Button.astro`、`IconButton.astro`、`Chip.astro` 是页面使用 Material Web 组件的统一入口。
- `material-colors.ts` 将内容级 seed color 转换为 `--mie-light-*` / `--mie-dark-*` CSS 变量，并由 `.mie-dynamic-color` 映射到 `--md-sys-color-*`。
- 站点级 dynamic color 已挂在 `<html class="mie-dynamic-color">`，文章级 dynamic color 仍通过局部 `.mie-dynamic-color` 覆盖。
- `material-colors.ts` 支持从稳定字符串派生 seed，`TermCloud`、首页热门 tag、文章 taxonomy chip 和 section card 已使用局部 dynamic color。
- `PageHeader.astro` 已支持传入动态色彩 style，posts、search、archive、taxonomy、term 和 section 页面的 header 可以使用集合级或条目级 seed 形成 tonal header。
- `ScrollSystem.astro` 提供全站自绘滚动条、拖动、轨道跳转和文章 heading marker。
- `tokens.css` 开始提供 Material semantic aliases。
- `scrollbar.css` 隐藏 JS 可用时的原生滚动条，并提供无 JS fallback。
- Header 图标按钮、搜索关闭按钮、首页 tag chip、文章 taxonomy chip、文章目录/编辑操作、footer 控件、分页控件、分享按钮、taxonomy compact 列表和 MDX `ActionLinks` 已通过 Material Web wrapper 或 Material token 统一状态语法。
- 小控件 hover 上浮已经基本清理完成。当前按钮、icon button、chip、搜索入口和文章操作控件主要依赖 tonal fill、state layer、ripple、icon micro-motion 和 pressed scale。
- 当前源码交互审计中，状态块里的 `translateY(...)` 只剩 mobile nav 面板打开入场，不是普通控件 hover。后续优化重点应从“取消上浮”转向“内容入口、社交链接、blur/elevation 和性能预算”。
- Footer 社交链接、导航链接/下拉、文章卡片、section/term 卡片、前后篇分页卡片、archive item、review/media block 仍保留 `md-ripple` 或博客专用交互结构作为过渡层，其中 archive item 已改为文章级动态色彩入口。
- 首页、列表页、文章页、搜索浮层、PhotoSwipe lightbox 和文章代码块已开始使用 `--md-sys-color-*`、inverse surface、scrim 和 elevation token。

## 继续迁移边界

优先继续打磨这些“明确是控件或控件行为”的表面：

1. 首页和 footer 社交链接：当前展开标签动效会改变宽度，需要决定桌面保留、移动端关闭，或改成 Material icon button + tooltip；
2. search overlay 和 search page：搜索结果更偏列表激活语法，不应像普通卡片漂浮；
3. mobile nav：保留 dialog-like surface 和 list item selected state，避免继续增加强动效；
4. 后续 dialog、tabs、menu、switch、text field 等真正需要 Material Web 行为的控件，仍然必须先进入 `components/material/` 包装层；
5. 小控件 pressed scale 和 icon micro-motion 可抽成少量主题 token，避免各处局部写不同数值。

暂时不强制替换这些“博客阅读结构”：

1. 文章卡片、前后篇分页卡片和 archive item，它们是内容预览容器，不是单纯按钮；
2. section/term card 的大块发现入口，它们需要保持动态色彩和布局表达；
3. review/media block，它们更接近文章内容组件，适合用 Material token 和 ripple 统一状态，而不是直接塞进通用 button/chip。

后续实现应优先扩展 token 和包装层，而不是在每个页面局部继续手写一次按钮/状态/滚动逻辑。新的 `<md-*>` 组件进入页面前，必须先放进 `components/material/` 包装层并在文档中说明使用边界。

## 下一阶段重点

当前 Material 迁移的第一阶段已经完成：语义 token、动态色、Material wrapper、ripple/state layer、主题切换、shared transition 和小控件 hover 收敛都已具备。接下来优先级如下：

1. **社交链接与控件收尾**：评估 `.social-link` 的宽度展开动画，统一 pressed scale 和 icon micro-motion token。
2. **内容入口精修**：post card、term card、archive item、search result、previous/next post card 按角色拆分交互语法。
3. **blur / elevation 收敛**：保留 header、search overlay、mobile nav、TOC、lightbox 等 floating surface 的玻璃感，普通内容容器优先使用 tonal surface、border 和 overlay。
4. **文章页阅读精修**：让 article hero、TOC、正文链接、图片、series nav 和 pagination 都服务阅读，而不是抢注意力。
5. **性能预算**：PhotoSwipe、KaTeX、Material Web、ScrollSystem 和 CSS bundle 都需要按需加载或配置开关评估。
