import {environment} from "../environments/environment";

const baseUrl = environment.baseUrl;

export class AppUtil {
  public static assetsUrl(asset: string | undefined, folder: string = "storage") {
    return `${baseUrl}/${folder}/${asset}`;
  }
}
