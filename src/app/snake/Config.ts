module app {
	export class Config{
		/**
		 * 贪吃蛇的方向
		 */
		public static SNAKE_DIRECTION:string = "SnakeEvent::SnakeDirection";
		public static SPEED1:number = 300;
		public static SPEED2:number = 500;
		public static SPEED3:number = 800;
	}

	/**
	 * 贪吃蛇的方向
	 */
	enum SnakeDirection {
		Left,
		Right,
		Up,
		Down
	}

	
}