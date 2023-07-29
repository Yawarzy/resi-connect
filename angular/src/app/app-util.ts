import {environment} from "../environments/environment";

const baseUrl = environment.baseUrl;

export class AppUtil {
  public static assetsUrl(asset: string) {
    return `${baseUrl}/dist/${asset}`;
  }
}
