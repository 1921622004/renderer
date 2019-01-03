import Reconciler from 'react-reconciler';

function insertTextNode(element, children) {
    let textNode = document.createTextNode(children);
    element.appendChild(textNode);
}

function insertDomNode(element, children) {
    element.appendChild(children);
}

function insertNode(element, children) {
    if (Array.isArray(children)) {
        children.forEach(function (child) {
            if (typeof child === 'string' || typeof child === 'number') {
                insertTextNode(element, child)
            } else {
                console.log('child:', child);

                insertDomNode(element, child)
            }
        });
    } else {
        if (children instanceof HTMLElement) {
            insertDomNode(element, children)
        } else {
            insertTextNode(element, children)
        }
    }
}

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
    appendChildToContainer(container, child) {
        console.log('appendChildToContainer', [container,child]);
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
            } else if (typeof val === 'number' || typeof val === 'string') {
                const textNode = document.createTextNode(val);
                element.appendChild(textNode)
            }
        }
        return element
    },
    appendInitialChild(parentInstance, child) {
        console.log('appendInitialChild', [parentInstance, child]);
        parentInstance.appendChild(child);
    },
    prepareUpdate(...args) {
        console.log('prepareUpdate', ...args);
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