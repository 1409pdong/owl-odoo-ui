# CheckBox Component

## 1. Design Principles (Dành cho BA/Designer)
- **Usage:** Sử dụng khi người dùng cần chọn một hoặc nhiều mục từ danh sách.
- **Behavior:** Click vào label hoặc box đều kích hoạt.
- **Accessibility:** Luôn phải có label đi kèm (aria-label).

## 2. API Properties (Dành cho Dev)
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Required | ID duy nhất cho phần tử input |
| `value` | Boolean | false | Trạng thái của checkbox |
| `label` | String | - | Nội dung văn bản hiển thị |
| `onChange` | Function | - | Callback khi thay đổi trạng thái |

## 3. Style Tokens (Dành cho Dev)
- **Primary:** `$primary-500`
- **Border:** `$neutral-300`
- **Radius:** `$size-300`