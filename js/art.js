/**
 * Created by Administrator on 2017/4/1 0001.
 */
//通用函数
function g(selector){
    //substr(0,1)从字符串中的第一个字符开始选择一个字符，也就是第一个字符
    var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}
//随机生成一个值，范围random([min,max])
function random(range){
    var max=Math.max(range[0],range[1]);
    var min=Math.min(range[0],range[1]);
    var diff=max-min;//差值
    var num=Math.floor(Math.random()*diff)+min;
    return num;
}
//输出所有海报
var data=data;
function addphoto(){
    var temp=g('#panel_3').innerHTML;
    var html=[];
    var nav=[];
    for(s in data){
        var _html=temp.replace('{{index}}',s).replace('{{img}}',data[s].img)
            .replace('{{caption}}',data[s].caption)
            .replace('{{desc}}',data[s].desc);
        html.push(_html);
        nav.push('<span id="nav_'+s+'"  onclick="turn(g(\'#photo_'+s+'\'))" class="i"></span>')
    }
    html.push('<div class="nav">'+nav.join('')+'</div>');

    g('#panel_3').innerHTML=html.join('');

    rsort(random([0,data.length]));
}

//调用
addphoto();


//计算左右分区的范围
function range(){
    var range={left:{x:[],y:[]},right:{x:[],y:[]}};
    var wrap={
        w:g('#panel_3').clientWidth,
        h:g('#panel_3').clientHeight
    }
    var photo={
        w:g('.photo')[0].clientWidth,
        h:g('.photo')[0].clientHeight
    }
    range.wrap=wrap;
    range.photo=photo;

    range.left.x=[0-photo.w/2,wrap.w/2-photo.w];
    range.left.y=[0-photo.h/2,wrap.h-photo.h/2];
    range.right.x=[wrap.w/2+photo.w/2,wrap.w-photo.w/2];
    range.right.y=[0-photo.h/2,wrap.h-photo.h/2];
    return range;
}
//排序海报
function rsort(n){
    var _photo=$('.photo');
    var photos=[];//将.photo转换成数组，保存所有海报

    for(s=0;s<_photo.length;s++){
        _photo[s].className=_photo[s].className.replace(/\s*photo_center\s*/,' ');
        _photo[s].className=_photo[s].className.replace(/\s*photo_front\s*/,' ');
        _photo[s].className=_photo[s].className.replace(/\s*photo_back\s*/,' ');

        _photo[s].className+=' photo_front ';
        _photo[s].style.left='';
        _photo[s].style.top='';
        _photo[s].style['-webkit-transform']='rotate(360deg) scale(1.3)';
        photos.push(_photo[s]);

    }
    var photo_center=g('#photo_'+n);
    photo_center.className+=' photo_center';

    photo_center=photos.splice(n,1)[0];//删掉居中的那个photo

    //把剩下的海报分为左右两部分
    var photo_left=photos.splice(0,Math.ceil(photos.length/2));
    var photo_right=photos;

    var ranges=range();
    for(s in photo_left){
        var photo=photo_left[s];
        photo.style.left=random(ranges.left.x)+'px';
        photo.style.top=random(ranges.left.y)+'px';
        photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg) scale(1)';
    }
    for(s in photo_right){
        var photo=photo_right[s];
        photo.style.left=random(ranges.right.x)+'px';
        photo.style.top=random(ranges.right.y)+'px';
        photo.style['-webkit-transform']='rotate('+random([-150,150])+'deg) scale(1)';
    }
    //控制按钮
    var navs=g('.i');
    for( var s=0;s<navs.length; s++){
        navs[s].className=navs[s].className.replace(/\s*i_current\s*/,'');
        navs[s].className=navs[s].className.replace(/\s*i_back\s*/,'');
    }
    g('#nav_'+n).className+=' i_current ';
}
//翻面控制
function turn(elem){
    var cls=elem.className;
    var n=elem.id.split('_')[1];//找到索引编号

    if(!/photo_center/.test(cls)){
        return rsort(n);
    }
    if(/photo_front/.test(cls)){
        cls=cls.replace(/photo_front/,'photo_back');
        g('#nav_'+n).className+=' i_back ';
    }else{
        cls=cls.replace(/photo_back/,'photo_front');
        g('#nav_'+n).className=g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
    }
    return elem.className=cls;
}