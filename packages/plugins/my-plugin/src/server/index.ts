/*
 * @Author: pangff
 * @Date: 2022-08-15 10:12:52
 * @LastEditTime: 2022-08-18 15:28:03
 * @LastEditors: pangff
 * @Description: 
 * @FilePath: /my-noco-app/packages/plugins/my-plugin/src/server/index.ts
 * stay hungry,stay foolish
 */
import { InstallOptions, Plugin } from '@nocobase/server';
import {Context} from '@nocobase/actions';
import * as actions from './actions/news';
import * as middlewares from './middlewares';
export class MyPluginPlugin extends Plugin {
  getName(): string {
    return this.getPackageName(__dirname);
  }

  public appendParamsMiddleware;

  beforeLoad() {
    this.app.middleware.unshift(middlewares.appendParams().compose());
  }

  

  async load() {

    for (const [key, action] of Object.entries(actions)) {
      this.app.resourcer.registerActionHandler(`news:${key}`, action);
    }
   
  }

  async install(options: InstallOptions) {
  }
}

export default MyPluginPlugin;
