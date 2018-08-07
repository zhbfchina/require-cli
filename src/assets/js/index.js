require(['vue', 'less!../css/test'], function(Vue) {
    new Vue({
        el: '#app',
        data: {
            isActive: true,
            hasError: false
        },
        beforeCreate: function() {
            alert("beforeCreate");

        },
        // created 钩子可以用来在一个实例被创建之后执行代码：
        created: function() {
            // `this` 指向 vm 实例
            console.log('a is: ' + this.a)
            alert("created");

        },
        beforeMount: function() {
            alert("beforeMount");

        },
        mounted: function() {
            alert("mounted");

        },
        beforeUpdate: function() {
            alert("bupdate");

        },
        updated: function() {
            alert("update");
        },
        //when vm.$destory() is called
        beforeDestroy: function() {
            alert("beforedes");

        },
        destroyed: function() {
            alert("des");
        },
    });


});

import sum from './sum';

alert(sum(1, 2));

class A {
    constructor(a) {
        alert('Hello ' + a);
    }
}

new A('world!');