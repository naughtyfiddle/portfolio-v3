export default function Rect(x, y, w, h) {
	return {
		x, y, w, h,

		get left() {
			return this.x;
		},
		get right() {
			return this.x + this.w;
		},
		get top() {
			return this.y;
		},
		get bottom() {
			return this.y + this.h;
		},

		overlaps(other) {
			const overlapsBottomRight = this.left >= other.left
				&& this.left < other.right
				&& this.top >= other.top
				&& this.top < other.bottom;

			const overlapsTopLeft = other.left >= this.left
				&& other.left < this.right
				&& other.top >= this.top
				&& other.top < this.bottom;

			const overlapsTopRight = this.left >= other.left
				&& this.left < other.right
				&& other.top >= this.top
				&& other.top < this.bottom;

			const overlapsBottomLeft = other.left >= this.left
				&& other.left < this.right
				&& this.top >= other.top
				&& this.top < other.bottom;

			return overlapsBottomRight || overlapsTopLeft || overlapsTopRight || overlapsBottomLeft;
		},

		isOffscreen(canvas) {
			return this.left > canvas.clientWidth || this.right < 0 || this.top > canvas.clientHeight || this.bottom < 0;
		},

		moveTo(x, y, w = this.w, h = this.h) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}
	};
}
