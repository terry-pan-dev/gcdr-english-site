# Dining Room 页面样式调整指南

## 📍 文件位置
- 组件文件：`src/components/buildings/DiningRoomDetail.tsx`
- 页面文件：`src/pages/buildings/dinning-room.astro`

---

## 1. 上方图片的尺寸调整

### 位置：`src/components/buildings/DiningRoomDetail.tsx` 第 58-73 行

```tsx
{/* Featured Image */}
<div className="mb-6">  {/* ← 这里控制图片下方的间距 */}
  <motion.div
    className="relative overflow-hidden rounded-lg max-w-4xl"  {/* ← 这里控制图片最大宽度 */}
    style={{ border: "2px solid #c9a050" }}
  >
    <img
      src={featuredImage.src}
      alt={featuredImage.alt}
      className="w-full h-auto object-cover"  {/* ← 这里控制图片显示方式 */}
    />
  </motion.div>
</div>
```

### 调整方法：

**图片宽度：**
- `max-w-4xl` → 最大宽度约 896px
- 可改为：`max-w-xs` (384px), `max-w-sm` (640px), `max-w-md` (768px), `max-w-lg` (1024px), `max-w-xl` (1280px), `max-w-2xl` (672px), `max-w-3xl` (768px), `max-w-5xl` (1024px), `max-w-6xl` (1152px), `max-w-7xl` (1280px)
- 或使用固定宽度：`w-1/2` (50%), `w-2/3` (66%), `w-3/4` (75%), `w-full` (100%)

**图片间距：**
- `mb-6` → 下方间距 1.5rem (24px)
- 可改为：`mb-4` (16px), `mb-8` (32px), `mb-12` (48px), `mb-16` (64px)

**图片显示方式：**
- `object-cover` → 覆盖整个容器，可能裁剪
- 可改为：`object-contain` (完整显示，可能有空白), `object-fill` (拉伸填满)

**图片高度：**
- 如需固定高度，添加：`h-64` (256px), `h-96` (384px), `h-[500px]` (自定义)

---

## 2. 中间文字的格式调整

### 位置：`src/components/buildings/DiningRoomDetail.tsx` 第 78-88 行

```tsx
{/* Left Column - Long Text */}
<motion.div
  className="prose prose-lg max-w-none"  {/* ← 这里控制文字容器样式 */}
>
  <div className="text-stone-700 leading-relaxed whitespace-pre-line">  {/* ← 这里控制文字样式 */}
    {leftText}
  </div>
</motion.div>
```

### 调整方法：

**文字格式支持：**
在 `dinning-room.astro` 的 `leftText` 中，你可以使用 HTML 标签来格式化文字：

```tsx
leftText: `
  <p class="text-center font-bold text-xl mb-4">居中加粗标题</p>
  
  <blockquote class="border-l-4 border-accent-gold pl-4 italic my-4">
    这是引用文字，左边有金色引用线
  </blockquote>
  
  <p class="text-center">这是居中文字</p>
  
  <p><strong>这是加粗文字</strong></p>
  
  <p class="text-lg font-semibold">这是大号加粗文字</p>
  
  <div class="text-center my-6">
    <p class="text-2xl font-serif">大标题</p>
  </div>
`
```

**常用格式类：**

- **加粗：** `font-bold`, `font-semibold`, `font-medium`
- **居中：** `text-center`
- **左对齐：** `text-left` (默认)
- **右对齐：** `text-right`
- **字号：** `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- **引用线：** `border-l-4 border-accent-gold pl-4` (左边金色线)
- **间距：** `my-4` (上下), `mt-4` (上), `mb-4` (下), `px-4` (左右), `py-4` (上下)

**修改组件以支持 HTML：**
将第 85-87 行改为：

```tsx
<div 
  className="text-stone-700 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: leftText }}
/>
```

这样 `leftText` 中的 HTML 标签就会被渲染。

---

## 3. 右侧框框的位置调整

### 位置：`src/components/buildings/DiningRoomDetail.tsx` 第 76 行和第 96 行

```tsx
{/* Two Column Text Layout */}
<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-8 mb-12">
  {/* ... */}
  
  {/* Right Column - Info Table */}
  <motion.div
    className="lg:sticky lg:top-24 lg:self-start"  {/* ← 这里控制右侧框框的位置 */}
  >
    <div className="bg-white rounded-lg shadow-lg p-6 border-2">  {/* ← 这里控制框框样式 */}
```

### 调整方法：

**左右比例：**
- `lg:grid-cols-[2fr_1fr]` → 左侧 2/3，右侧 1/3
- 可改为：
  - `lg:grid-cols-[3fr_1fr]` → 左侧 75%，右侧 25%
  - `lg:grid-cols-[1fr_1fr]` → 左右各 50%
  - `lg:grid-cols-[5fr_2fr]` → 左侧 71%，右侧 29%

**右侧框框垂直位置：**
- `lg:top-24` → 距离顶部 6rem (96px)
- 可改为：`lg:top-16` (64px), `lg:top-32` (128px), `lg:top-40` (160px)
- 或移除 `lg:sticky` 让框框跟随内容流

**框框内边距：**
- `p-6` → 内边距 1.5rem (24px)
- 可改为：`p-4` (16px), `p-8` (32px), `px-6 py-4` (左右24px，上下16px)

**框框宽度（左右长度）：**
- 当前设置：`max-w-sm w-full` → 最大宽度 384px，最小宽度 100%
- 可改为：
  - `max-w-xs` (384px) - 很小
  - `max-w-sm` (384px) - 小，当前设置
  - `max-w-md` (448px) - 中等
  - `max-w-lg` (512px) - 大
  - `max-w-xl` (576px) - 很大
  - `max-w-2xl` (672px) - 非常大
  - `w-64` (256px) - 固定宽度
  - `w-80` (320px) - 固定宽度
  - `w-96` (384px) - 固定宽度
  - `w-full` (100%) - 填满容器
- 示例：`max-w-md w-full` = 最大 448px，最小填满容器

**框框位置（水平）：**
- 如需右对齐，添加：`ml-auto` (左边距自动，推向右)
- 如需居中，添加：`mx-auto` (左右边距自动)

---

## 4. 文字的位置调整

### 左侧文字位置：`src/components/buildings/DiningRoomDetail.tsx` 第 78-88 行

```tsx
<motion.div
  className="prose prose-lg max-w-none"  {/* ← 这里控制文字容器 */}
>
  <div className="text-stone-700 leading-relaxed whitespace-pre-line">
    {leftText}
  </div>
</motion.div>
```

### 右侧文字位置：`src/components/buildings/DiningRoomDetail.tsx` 第 98-117 行

```tsx
<div className="bg-white rounded-lg shadow-lg p-6 border-2">
  <h3 className="text-2xl font-serif mb-6 text-stone-900">Building Information</h3>
  <div className="space-y-4">  {/* ← 这里控制文字项之间的间距 */}
    {/* ... */}
    <div className="border-b border-stone-200 pb-3 last:border-0">  {/* ← 这里控制每行的样式 */}
      <div className="font-semibold text-stone-800 mb-1">{label}</div>  {/* ← 标签样式 */}
      <div className="text-stone-600">{value}</div>  {/* ← 值样式 */}
    </div>
```

### 调整方法：

**左侧文字容器：**
- `max-w-none` → 不限制最大宽度
- 可改为：`max-w-2xl` (672px), `max-w-3xl` (768px), `max-w-4xl` (896px)
- 添加 `mx-auto` 可让文字居中

**文字行高：**
- `leading-relaxed` → 行高 1.625
- 可改为：`leading-normal` (1.5), `leading-loose` (2), `leading-tight` (1.25)

**右侧文字间距：**
- `space-y-4` → 每项之间间距 1rem (16px)
- 可改为：`space-y-2` (8px), `space-y-6` (24px), `space-y-8` (32px)

**右侧标签样式：**
- `font-semibold` → 半粗体
- `text-stone-800` → 深灰色
- `mb-1` → 下方间距 0.25rem (4px)
- 可改为：`font-bold` (粗体), `text-stone-900` (更深), `mb-2` (更大间距)

**右侧值样式：**
- `text-stone-600` → 中灰色
- 可改为：`text-stone-700` (更深), `text-stone-500` (更浅)

---

## 📝 快速参考

### 常用 Tailwind 类：

**宽度：** `w-full`, `w-1/2`, `w-2/3`, `max-w-4xl`, `max-w-6xl`
**间距：** `p-4`, `p-6`, `p-8`, `mb-4`, `mb-6`, `mt-4`, `gap-4`, `gap-8`
**对齐：** `text-center`, `text-left`, `text-right`, `mx-auto`, `ml-auto`
**字体：** `font-bold`, `font-semibold`, `text-lg`, `text-xl`, `text-2xl`
**边框：** `border-l-4`, `border-accent-gold`, `border-2`
**颜色：** `text-stone-700`, `text-accent-gold`, `bg-white`

### 修改步骤：

1. 打开 `src/components/buildings/DiningRoomDetail.tsx`
2. 找到对应的代码行（参考上面的位置）
3. 修改 className 中的 Tailwind 类
4. 保存文件，页面会自动更新


