var app = new Vue({
  el: '#wrapper',
  data: {
    message: 'Hello Vue!',
    attribute_message: '页面加载于 ' + new Date().toLocaleString(),
    seen: true,
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ],
    reverseMsg: 'Hello Vue!',
    inputMsg: '',
  },
   methods: {
    reverseMessage: function () {
      this.reverseMsg = this.reverseMsg.split('').reverse().join('')
    },
    getData: function() {
        axios.post('/getApi/getContainerType', {
            'container_no': 'irsu2464907'
        }).then(function (res) {
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });
    }
  }
})