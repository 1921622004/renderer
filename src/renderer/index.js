import Reconciler from 'react-reconciler';

const hostConfig = {
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
    appendChildToContainer(container, child) {
        console.log('appendChildToContainer', [container, child]);
        container.appendChild(child)
    },
    // div#root 
    prepareForCommit(container) {
        console.log('prepareForCommit', container);
    },
    // div#root
    resetAfterCommit(container) {
        console.log('resetAfterCommit', container)
    },
    /**
     *  
     * @param {*} type  fiber节点的nodename
     * @param {*} newProps  当前dom实例的属性
     * @param {*} rootContainerInstance 根节点DOM元素
     * @param {*} currentHostContext   从父级getChildHostContext 获取的上下文
     * @param {*} workInProgress  
     * 
     *  只需要返回dom元素即可
     */
    createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress) {
        console.log('createInstance', [...arguments]);

        const element = document.createElement(type);
        for (const key in newProps) {
            const val = newProps[key];
            if (key === 'className') {
                element.className = val
            } else if (key === 'style') {
                element.style = val
            } else if (key.startsWith('on')) {
                const eventType = key.slice(2).toLowerCase();
                element.addEventListener(eventType, val);
            } else if (key === 'children') {
                if (typeof val === 'string' || typeof val === 'number') {
                    const textNode = document.createTextNode(val);
                    element.appendChild(textNode)
                }
            } else {
                console.log(key,val,'==================');
                
                element.setAttribute(key, val)
            }
        }
        return element
    },
    appendInitialChild(parentInstance, child) {
        console.log('appendInitialChild', [parentInstance, child]);
        parentInstance.appendChild(child);
    },
    /**
     * 
     * @param domElement 当前dom节点
     * @param type  当前dom节点nodetype
     * @param oldProps  旧的属性
     * @param newProps  新的属性
     * @param rootContainerInstance  容器组件 
     * @param hostContext  上下文
     * @return  不需要更新 返回null | 更新则返回 Array 然后将当前的fiber节点标记为需要更新
     * 
     */
    prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
        console.log('prepareUpdate', [...arguments]);
        let updatePayload = null;
        for (const key in oldProps) {
            const lastProp = oldProps[key];
            const nextProp = newProps[key];
            if (key === 'children') {
                if (nextProp != lastProp && (typeof nextProp === 'number' || typeof nextProp === 'string')) {
                    updatePayload = updatePayload || [];
                    updatePayload.push(key, nextProp);
                }
            } else {
                // 其余暂不考虑
            }
        };
        return updatePayload
    },
    finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
        console.log('finalizeInitialChildren', [...arguments]);
        return !!props.autoFocus
    },
    /**
     * 
     * @param {*} type 当前节点的type domnode 
     * @param {*} props 传递给当前节点的属性
     */
    shouldSetTextContent(type, props) {
        console.log('shouldSetTextContent', [type, props]);
        return typeof props.children === 'string' || typeof props.children === 'number'
    },
    commitMount(){
        console.log('commitMount');
        
    },
    // 记录当前时间 
    now() {
        console.log('now');
        return Date.now()
    },
    supportsMutation: true,
    /**
     * @param domElement
     */
    commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
        for (var i = 0; i < updatePayload.length; i += 2) {
            var propKey = updatePayload[i];
            var propValue = updatePayload[i + 1];
            if (propKey === 'style') {

            } else if (propKey === 'children') {
                domElement.textContent = propValue;
            }
        }
        console.log('commitUpdate', [...arguments]);
    },
};

const reconcilerInstance = Reconciler(hostConfig);

export default {
    render(ele, containerDom, callback) {
        const container = reconcilerInstance.createContainer(containerDom, false, false);
        reconcilerInstance.updateContainer(
            ele,
            container,
            null, // parentComponent 父级fiber节点,
            callback
        )
        console.log('render', [...arguments]);
    },
}