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

appendInitialChild  挂载DOM到父级dom上

prepareForCommit  初次渲染时，已经构建好所有dom节点，马上就要挂在到div#root上了，react-dom中暂时禁止事件触发，我们就直接写一个空函数。 更新时即将准备更新DOM

appendChildToContainer  就是将组件挂载到当前容器节点上  

resetAfterCommit  此时已经将挂载完成，react-dom中解除事件的禁止，我们还是直接写空函数。  更新DOM后。

prepareUpdate 
```javascript
var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
workInProgress.updateQueue = updatePayload;
if (updatePayload) {
    // 标记为待更新
    markUpdate(workInProgress);
}

```

commitUpdate   准备更新