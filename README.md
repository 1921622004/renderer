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

react
暴露了几个方法，主要就是定义component，并不包含怎么处理更新的逻辑。

react-dom （renderer）
负责处理视图的更新

reconciler
16版本之后的react从stack reconciler重写为fiber reconciler，主要作用就是去进行diff算法，找出需要更新的节点。

### 开始写
先create-react-app建一个项目，然后安装react-reconciler，修改index.js文件，改为用我们自己写的renderer来渲染。

先建立一个文件，就叫renderer吧，怎么写呢，看下[react-reconciler的readme.md](https://github.com/facebook/react/blob/master/packages/react-reconciler/README.md)如下：
```javascript
import Reconciler from "react-reconciler"

const hostConfig = {
    //  ... 这里写入需要使用的函数
};
const MyReconcilerInstance = Reconciler(hostConfig);
const MyCustomRenderer = {
    render(ele, container, callback){
        const container = MyReconcilerInstance.createContainer(container, false);
    }
};
export default MyCustomRenderer

```

然后hostConfig怎么写呢，官方已经给出了完整的列表，如下：
```javascript
// 这些是渲染需要的
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
    supportsMutation:true,
    supportsPersistence:true,
    supportsHydration:true,
}
```
然后我们修改App.js文件，简单的写一个计数器，大致如下：
```javascript
class Counter extends Component {
    state = {
        count: 1
    }

    increment = () => {
        this.setState((state) => {
            return { count: state.count + 1 }
        })
    }

    decrement = () => {
        this.setState((state) => {
            return { count: state.count - 1 }
        })
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <button onClick={this.decrement}> - </button>
                <span>{count}</span>
                <button onClick={this.increment}> + </button>
            </div>
        )
    }
}
```

打开浏览器看一下发现并没有渲染出任何东西，打开console，这些函数的调用顺序如下图，好的，那我们开始写这些函数：
【】

- **now** 这个函数是用来返回当前时间的，所以我们就写成Date.now 就可以了。
- **getRootHostContext** 这个函数可以向下一级节点传递信息，所以我们就简单的返回一个空对象。
```js
// rootContainerInstance 根节点 我们这里就是div#root
getRootHostContext(rootContainerInstance){
    return {}
}
```
- **getChildHostContext** 这个函数用来从上一级获取刚才那个函数传递过来的上下文，同时向下传递，所以我们就接着让他返回一个空对象
```js
/**
 * parentHostContext  从上一级节点传递过来的上下文
 * type   当前节点的nodeType
 * rootContainerInstance  根节点
 */ 
getChildHostContext(parentHostContext, type, rootContainerInstance){
    return {}
} 
```

- **shouldSetTextContent** 这个函数是用来判断是否需要去设置文字内容，如果是在react native中就始终返回false，因为文字也需要去单独生成一个节点去渲染。这里我们写简单点，不去考虑dangerouslySetInnerHTML的情况，就直接判断children是不是字符串或者数字就可以了
```js
/*
 * type 当前节点的nodeType
 * props 要赋予当前节点的属性
 */
shouldSetTextContent(type, props) {
    return typeof props.children === 'string' || typeof props.children === 'number'
},
```

- **createInstance** 这个函数就是要生成dom了。
```js
/**
 *  type 当前节点的nodeType
 *  newProps 传递给当前节点的属性
 *  rootContainerInstance  根节点
 *  currentHostContext  从上级节点传递下来的上下文
 *  workInProgress   当前这个dom节点对应的fiber节点
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
        } else if (key === 'children') {
            if (typeof val === 'string' || typeof val === 'number') {
                const textNode = document.createTextNode(val);
                element.appendChild(textNode)
            }
        } else {
            element.setAttribute(key, val)
        }
    }
    return element
},
```

- **finalizeInitialChildren**  这个函数用来决定当前节点在commit阶段是否无法完成某些功能，需要在确定dom节点已经挂载上之后，才能去完成这个功能，其实主要就是要判断autofocus，所以我们就简单的判断一下是否有这个属性就可以了
```js
/**
 *  domElement 当前已经生成的dom节点
 *  type  nodeType
 *  props  属性
 *  rootContainerInstance 根节点
 *  hostContext 上下级传递过来的上下文
 */ 
finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
    return !!props.autoFocus
},
```

- **appendInitialChild** 这个就是用来将刚刚生成的节点挂载到上一层节点的