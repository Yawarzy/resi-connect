import {environment} from "../environments/environment";

const baseUrl = environment.baseUrl;

export class AppUtil {
  public static assetsUrl(asset: string | undefined, folder: string = "storage") {
    return `${baseUrl}/${folder}/${asset}`;
  }

  public static toDate(date: string | null) {
    if (!date) return new Date().toLocaleDateString();
    return new Date(date).toLocaleDateString();
  }
}
