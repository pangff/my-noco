import { InstallOptions, Plugin } from '@nocobase/server';
import {Context} from '@nocobase/actions';
import * as actions from './actions/news';

export class MyPluginPlugin extends Plugin {
  getName(): string {
    return this.getPackageName(__dirname);
  }

  beforeLoad() {
    // TODO
  }

  async load() {

    for (const [key, action] of Object.entries(actions)) {
      this.app.resourcer.registerActionHandler(`news:${key}`, action);
    }
   
  }

  async install(options: InstallOptions) {
    // TODO
  }
}

export default MyPluginPlugin;
