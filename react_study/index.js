import React from './react/react';

const element = React.createElement('button',{
    id: 1, style:{color:'red'}
},'click',React.createElement('b',{},'~me'));

// {type:"button",props:{id:1}}
React.render(element,document.getElementById('app'));