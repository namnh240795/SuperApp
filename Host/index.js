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

const resolveURL = Federated.createURLResolver({
  containers: {
    techhub: 'http://localhost:9002/[name][ext]',
  },
});

const storage = new MMKV();
storage.getItem = async key => storage.getString(key);
storage.setItem = async (key, value) => storage.set(key, value);
storage.removeItem = async key => storage.delete(key);

ScriptManager.shared.setStorage(storage);

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  // In dev mode, resolve script location to dev server.
  let url;
  console.log(scriptId);
  console.log(scriptId, caller);
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
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
