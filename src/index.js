import printMe from './print.js';
//hack 修复HtmlWebpackPlugin插件无法热更新
if (process.env.NODE_ENV !== 'production') {
    require('file-loader!./index.html')
}
function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = 'Hello web2222pack';

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    var a=1;
    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}