/**
 * Created by Administrator on 2017/3/22 0022.
 */
var WINDOW_WIDTH;
$(document).ready(function(){
    window.onscroll= function () {
        WINDOW_WIDTH = document.body.scrollWidth || document.documentElement.scrollWidth;
        if(WINDOW_WIDTH<=800){
            if(getScrollTop(30)){
                document.getElementById('header').style.backgroundColor='rgba(8, 8, 8, 0.2)';;
            }
            else {
                document.getElementById('header').style.backgroundColor = 'transparent';
            }
            if(getScrollTop(500)){
                $('.abstract').addClass('moveup');
                $('.part2').addClass('moveup');
                $('.panel').addClass('moveright');
            }
            else{
                $('.abstract').removeClass('moveup');
                $('.part2').removeClass('moveup');
                $('.panel').removeClass('moveright');
            }
            if(getScrollTop(1000)){
                $('.abstract2').addClass('moveup');
                $('.part3').addClass('moveup');
                $('.slogan2').addClass('moveright');
            }
            else{
                $('.abstract2').removeClass('moveup');
                $('.part3').removeClass('moveup');
                $('.slogan2').removeClass('moveright');
            }
            if(getScrollTop(1500)){
                $('.part4').addClass('moveup');
            }
            else{
                $('.part4').removeClass('moveup');
            }
            if(getScrollTop(2000)){
                $('.part5').addClass('moveup');
                $('.song').addClass('moveright');
            }
            else{
                $('.part5').removeClass('moveup');
                $('.song').removeClass('moveright');
            }
        }
        else{
            if(getScrollTop(50)){
                document.getElementById('header').style.backgroundColor='rgba(8, 8, 8, 0.2)';;
            }
            else {
                document.getElementById('header').style.backgroundColor = 'transparent';
            }
            if(getScrollTop(700)){
                $('.abstract').addClass('moveup');
                $('.part2').addClass('moveup');
                $('.panel').addClass('moveright');
            }
            else{
                $('.abstract').removeClass('moveup');
                $('.part2').removeClass('moveup');
                $('.panel').removeClass('moveright');
            }
            if(getScrollTop(1390)){
                $('.abstract2').addClass('moveup');
                $('.part3').addClass('moveup');
                $('.slogan2').addClass('moveright');
            }
            else{
                $('.abstract2').removeClass('moveup');
                $('.part3').removeClass('moveup');
                $('.slogan2').removeClass('moveright');
            }
            if(getScrollTop(2090)){
                $('.part4').addClass('moveup');
            }
            else{
                $('.part4').removeClass('moveup');
            }
            if(getScrollTop(2780)){
                $('.part5').addClass('moveup');
                $('.song').addClass('moveright');
            }
            else{
                $('.part5').removeClass('moveup');
                $('.song').removeClass('moveright');
            }
            if(getScrollTop(3470)){
                $('.end-abstract').addClass('movein');
            }
            else{
                $('.end-abstract').removeClass('movein');
            }
        }
    }
    $('#musiclabel').click(function(){
        var audio=document.getElementById("vedio");
        if(audio.paused){
            audio.play();
            document.getElementById('musiclabel').className="music glyphicon glyphicon-volume-up";
        }else{
            audio.pause();
            document.getElementById('musiclabel').className="music glyphicon glyphicon-volume-off";
        }
    });
    var audio=document.getElementById('vedio');
    $('#part1_pic1').click(function(){
        audio.src='music/tangchao.mp3';
        audio.play();
    });
    $('#part1_pic2').click(function(){
        audio.src='music/lingdian.mp3';
        audio.play();
    });
    $('#part1_pic3').click(function(){
        audio.src='music/heibao.mp3';
        audio.play();
    });
    $('#part1_pic4').click(function(){
        audio.src='music/zhengjun.mp3';
        audio.play();
    });
    $('#part1_pic5').click(function(){
        audio.src='music/cuijian.mp3';
        audio.play();
    });
    $('#part1_pic6').click(function(){
        audio.src='music/xuwei.mp3';
        audio.play();
    });
    var pic1=document.getElementById('pic1');
    var pic2=document.getElementById('pic2');
    var pic3=document.getElementById('pic3');
    var pic4=document.getElementById('pic4');
    $('.infobar >li:eq(0)').click(function(){
        pic1.src='img/minyao/minyao1.jpg';
        pic2.src='img/minyao/minyao2.jpg';
        pic3.src='img/minyao/minyao3.jpg';
        pic4.src='img/minyao/minyao4.jpg';
    });
    $('.infobar >li:eq(1)').click(function(){
        pic1.src='img/minyao/minyao5.jpg';
        pic2.src='img/minyao/minyao6.jpg';
        pic3.src='img/minyao/minyao7.jpg';
        pic4.src='img/minyao/minyao8.jpg';
    });
    $('.infobar >li:eq(2)').click(function(){
        pic1.src='img/minyao/minyao9.jpg';
        pic2.src='img/minyao/minyao10.jpg';
        pic3.src='img/minyao/minyao11.jpg';
        pic4.src='img/minyao/minyao12.jpg';
    });
    $('.song1').click(function () {
        audio.src='music/tante.mp3';
        audio.play();
    });
    $('.song2').click(function () {
        audio.src='music/huabanxie.mp3';
        audio.play();
    });
    $('.song3').click(function () {
        audio.src='music/xiaopingguo.mp3';
        audio.play();
    });
    $('.song4').click(function () {
        audio.src='music/PPAP.mp3';
        audio.play();
    });
})
function move(obj,audioplay,num){
    obj.onmouseover=function(){
        audioplay.src='music/minyao'+num+'.mp3';
        audioplay.play();
    }
    obj.onmouseout=function(){
        audioplay.pause();
    }
}
function getScrollTop(height) {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset; }
    else if (document.compatMode && document.compatMode != 'BackCompat')
    { scrollPos = document.documentElement.scrollTop; }
    else if (document.body) { scrollPos = document.body.scrollTop; }
    if(scrollPos>=height){
        return true;
    }
    else{
        return false;
    }
}

