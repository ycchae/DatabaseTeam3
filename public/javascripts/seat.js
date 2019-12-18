var selected = 0;	// 현재 선택 인원
var adult_select = 0;	// 성인 선택 인원
var teenager_select = 0;	// 청소년 선택 인원

var seats = new Array();

for(var i = 1; i <= 50; i++){
		seats[i] = 0;
}

function setColor(id, index) {
	var property = document.getElementById(id);
	if (seats[index] == 0) {
		if(selected == adult_select + teenager_select){
    		alert("선택하신 인원을 초과하였습니다.");
		}
		else{
			property.style.backgroundColor = "#A9D0F5";
			seats[index] = 1;
			selected++;
		}     
	}
	else if(seats[index] == 1) {
		property.style.backgroundColor = "#D8D8D8";
		seats[index] = 0;
		selected--;
	}
}

function disable(id, index) {
	var property = document.getElementById(id);
	property.style.backgroundColor = "#F78181";
	seats[index] = 2;
}	

function change(now){
    var now_id = document.getElementById(now);
    var num = now_id.options[now_id.selectedIndex].value;

    num = Number(num);

    for(var i = 1; i <= 50; i++){
        if(seats[i] == 1){
            setColor('seat' + i, i);
        }
    }

    if(now == 'adult'){
        if(teenager_select + num > 8){
            alert("최대 8명까지 가능합니다.");
            $(now_id).val(0).prop("selected", true);	
        }
        else{
            adult_select = num;
        }	
    }
    else{
        if(adult_select + num > 8){
            alert("최대 8명까지 가능합니다.");
            $(now_id).val(0).prop("selected", true);
        }
        else{
            teenager_select = num;
        }
    }
}	

function check(user_id, ts_id){
	var checked = new Array();
				
	for(var i = 1; i <= 50; i++){
		if(seats[i] == 1){
			checked.push(i);
		}
    }

    if(user_id == ''){
        alert('예매를 하시려면 로그인을 해주세요.');
    }
    else{
        if(checked.length == 0){
            alert('선택한 좌석이 없습니다.');
        }
        else{
            var jsonString = JSON.stringify(checked);

            $.ajax({
                url: '/result?ts_id=' + ts_id,
                type: 'POST',
                data: {
                    data: jsonString,
                    id: user_id
                },
                success:function(data){
                    alert("예매가 완료되었습니다.");
                    if (typeof data.redirect == 'string')
                        window.location = data.redirect
                },
                error:function(request, status, err){
                    alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + err);
                }
            });
        }
    }
}