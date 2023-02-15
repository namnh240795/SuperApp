/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  ScriptManager,
  Script,
  ChunkManager,
  Federated,
} from '@callstack/repack/client';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
storage.getItem = async key => storage.getString(key);
storage.setItem = async (key, value) => storage.set(key, value);
storage.removeItem = async key => storage.delete(key);

ScriptManager.shared.setStorage(storage);

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  if (__DEV__) {
    return {
      url: Script.getDevServerURL(scriptId),
      query: {
        platform: Platform.OS,
      },
      cache: false,
    };
  } else {
    return {
      url: `http://38.242.142.81:3000/upload/${scriptId}.chunk.bundle`,
      cache: false,
    };
  }
});

ScriptManager.shared.on('resolving', (...args) => {
  console.log('DEBUG/resolving', ...args);
});

ScriptManager.shared.on('resolved', (...args) => {
  console.log('DEBUG/resolved', ...args);
});

ScriptManager.shared.on('prefetching', (...args) => {
  console.log('DEBUG/prefetching', ...args);
});

ScriptManager.shared.on('loading', (...args) => {
  console.log('DEBUG/loading', ...args);
});

ScriptManager.shared.on('loaded', (...args) => {
  console.log('DEBUG/loaded', ...args);
});

ScriptManager.shared.on('error', (...args) => {
  console.log('DEBUG/error', ...args);
});

AppRegistry.registerComponent(appName, () => App);
