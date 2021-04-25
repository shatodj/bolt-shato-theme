
/**
 * Create dispatch event of loaded module.
 * @param {string} moduleEvtKey
 * @param {mixed} data
 */
export const dispatch = (moduleEvtKey, data) => {
  if (typeof moduleEvtKey !== 'string') {
    throw new Error(`Invalid parameter. Must be string. Got '${typeof moduleEvtKey}'`);
  }

  if (!document.lazyModules) {
    document.lazyModules = {};
  }
  document.lazyModules[moduleEvtKey] = data;
  document.dispatchEvent(new Event(moduleEvtKey), data);
};

/**
 * Listen to `moduleEvtKey` event for module to be loaded
 * @param {string} moduleEvtKey
 * @param {function} resolve
 */
const listener = (moduleEvtKey, resolve) => {
  if (typeof moduleEvtKey !== 'string') {
    throw new Error(`Invalid parameter. Must be string. Got '${typeof moduleEvtKey}'`);
  }
  if (typeof resolve !== 'function') {
    throw new Error(`Invalid parameter. Must be a function. Got '${typeof resolve}'`);
  }

  if (document.lazyModules[moduleEvtKey]) {
    resolve(document.lazyModules[moduleEvtKey]);
  } else {
    document.addEventListener(moduleEvtKey, resolve);
  }
};

export default listener;
