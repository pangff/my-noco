/*
 * @Author: pangff
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2022-08-15 11:25:13
 * @LastEditors: pangff
 * @Description: 
 * @FilePath: /my-noco-app/packages/app/server/src/config/plugins.ts
 * stay hungry,stay foolish
 */
import { PluginsConfigurations } from '@nocobase/server';

export default [
  '@nocobase/plugin-error-handler',
  '@nocobase/plugin-collection-manager',
  '@nocobase/plugin-ui-schema-storage',
  '@nocobase/plugin-ui-routes-storage',
  '@nocobase/plugin-file-manager',
  '@nocobase/plugin-system-settings',
  '@nocobase/plugin-users',
  '@nocobase/plugin-acl',
  '@nocobase/plugin-china-region',
  '@nocobase/plugin-workflow',
  '@nocobase/plugin-client',
  '@nocobase/plugin-export',
  '@nocobase/plugin-audit-logs',
  '@my-noco-app/my-plugin',
] as PluginsConfigurations;
