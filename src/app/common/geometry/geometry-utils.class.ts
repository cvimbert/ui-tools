export class GeometryUtils {

  static toDegrees(angleInRadians: number): number {
    return 360 * angleInRadians / (2 * Math.PI);
  }

  static toRadians(angleInDegrees: number): number {
    return 2 * Math.PI * (angleInDegrees / 360);
  }
}