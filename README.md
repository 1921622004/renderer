```javascript
const hostConfig = {
    getPublicInstance(...args) {
        console.log('getPublicInstance', ...args);
    },
    getChildHostContext(...args) {
        console.log('getChildHostContext', ...args);
    },
    getRootHostContext(...args) {
        console.log('getRootHostContext', ...args);
    },
    appendChildToContainer(...args) { 
        console.log('appendChildToContainer', ...args);
    },
    prepareForCommit(...args) {
        console.log('prepareForCommit', ...args)
    },
    resetAfterCommit(...args) {
        console.log('resetAfterCommit', ...args)
    },
    createInstance(...args) {
        console.log('createInstance', ...args)
    },
    appendInitialChild(...args) {
        console.log('appendInitialChild', ...args)
    },
    finalizeInitialChildren(...args) {
        console.log('prepareUpdate', ...args)
    },
    shouldSetTextContent(...args) {
        console.log('shouldSetTextContent', ...args)
    },
    shouldDeprioritizeSubtree(...args) {
        console.log('shouldDeprioritizeSubtree', ...args);
    },
    createTextInstance(...args) {
        console.log('createTextInstance', ...args);
    },
    scheduleDeferredCallback(...args) {
        console.log('scheduleDeferredCallback', ...args);
    },
    cancelDeferredCallback(...args) {
        console.log('cancelDeferredCallback', ...args);
    },
    shouldYield(...args) {
        console.log('shouldYield', ...args);
    },
    scheduleTimeout(...args) {
        console.log('scheduleTimeout', ...args);
    },
    cancelTimeout(...args) {
        console.log('cancelTimeout', ...args);
    },
    noTimeout(...args) {
        console.log('noTimeout', ...args);
    },
    now(...arg){
        console.log('now',...args);
    },
    isPrimaryRenderer(...args) {
        console.log('isPrimaryRenderer', ...args);
    },
    supportsMutation(...args) {
        console.log('supportsMutation', ...args);
    },
    supportsPersistence(...args) {
        console.log('supportsPersistence', ...args);
    },
    supportsHydration(...args) {
        console.log('supportsHydration', ...args);
    },
}
```

把now 修改成Date.now  记录成当前时间

getRootHostContext 返回一个对象，里面返回一个对象，传递给子组件！。

getChildHostContext 同样返回一个对象，向下传递

shouldSetTextContent 返回boolean，返回真则开始createInstance，返回false则createTextInstance，

finalizeInitialChildren 返回boolean，主要判断是否autofocus