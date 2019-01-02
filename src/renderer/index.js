import Reconciler from 'react-reconciler';

const hostConfig = {
    getPublicInstance(...args) {
        console.log('getPublicInstance', ...args);
    },
    // 从上一层fiber节点获取上下文，并且向下一层传递
    getChildHostContext(parentHostContext, type, rootContainerInstance) {
        console.log('getChildHostContext', [parentHostContext, type, rootContainerInstance]);
        return parentHostContext
    },
    getRootHostContext(container) {
        console.log('getRootHostContext', ...arguments);
        return {
            info: 'awesome'
        }
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
    /**
     * 
     * @param {*} type 当前节点的type domnode 
     * @param {*} props 传递给当前节点的属性
     */
    shouldSetTextContent(type, props) {
        console.log('shouldSetTextContent', [type, props]);
        return typeof props.children === 'string' || 'number' 
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
    // 记录当前时间
    now: Date.now,
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
};

const reconcilerInstance = Reconciler(hostConfig);

export default {
    render(ele, containerDom, callback) {
        const container = reconcilerInstance.createContainer(containerDom, false);
        reconcilerInstance.updateContainer(
            ele,
            container,
            null, // parentComponent 父级fiber节点,
            callback
        )
        console.log('render', [...arguments]);
    },

}