(function () {
        let randomNum = (x) => Math.round(Math.random() * x);
        let arr = [];
        let heightArr = [];
        let topArr = [];
        let leftArr = [];
        let index = 1;
        let n = 0,m = 0;
        let column = 6;
        const CONTAINER = document.getElementsByClassName('s-d1')[0];

        function throttle(func, wait, mustRun) {
            let timeout, startTime = new Date();
            return function () {
                let context = this, curTime = new Date(), arg = arguments;
                clearTimeout(timeout);
                if (curTime - startTime >= mustRun) {
                    func.call(context, arg);
                    startTime = curTime;
                } else {
                    timeout = setTimeout(func, wait)
                }

            }
        }
        createGroup(30);
        while (m < arr.length) {
            setImageUrl(m, randomNum(38));
            m++
        }
        function createDom() {
            let outDiv = document.createElement('div');
            outDiv.setAttribute('class', 's-d1-d');
            outDiv.setAttribute('id', 'b' + index);
            //------------------------------------------
            let img = document.createElement('img');
            img.setAttribute('class', 's-d1-d-m');
            outDiv.appendChild(img);
            //-------------------------------------------
            //-------------------------------------------
            let fDiv = document.createElement('div');
            fDiv.setAttribute('class', 's-d1-d-d1');
            let label = document.createElement('span');
            label.setAttribute('class', 's-d1-d-d1-s');
            label.innerText = '小猫';
            fDiv.appendChild(label);
            //-----------------------------------------

            let p = document.createElement('p');
            p.setAttribute('class', 's-d1-d-d1-p');

            let i1 = document.createElement('i');
            i1.setAttribute('class', 'love');
            i1.className += " " + 'i1';
            let img2 = document.createElement('img');
            img2.setAttribute('src', 'img/bt_action_icons.svg');
            i1.appendChild(img2);


            let loveS = document.createElement('span');
            loveS.setAttribute('class', 's-d1-d-d1-s1');
            loveS.innerText = randomNum(100);


            let i2 = document.createElement('i');
            i2.setAttribute('class', 'share');
            i2.className += " " + 'i1';
            let img3 = document.createElement('img');
            img3.setAttribute('src', 'img/bt_action_icons.svg');
            i2.appendChild(img3);


            let shareS = document.createElement('span');
            shareS.setAttribute('class', 's-d1-d-d1-s2');
            shareS.innerText = randomNum(100);


            let i3 = document.createElement('i');
            i3.setAttribute('class', 'comment');
            i3.className += " " + 'i1';
            let img4 = document.createElement('img');
            img4.setAttribute('src', 'img/bt_action_icons.svg');
            i3.appendChild(img4);


            let commentS = document.createElement('span');
            commentS.setAttribute('class', 's-d1-d-d1-s3');
            commentS.innerText = randomNum(100);

            p.appendChild(i1);
            p.appendChild(loveS);
            p.appendChild(i2);
            p.appendChild(shareS);
            p.appendChild(i3);
            p.appendChild(commentS);

            fDiv.appendChild(p);
            outDiv.appendChild(fDiv);
            //--------------------------------------
            //--------------------------------------
            let userD = document.createElement('div');
            userD.setAttribute('class', 's-d1-d-d2');
            let userBox = document.createElement('div');
            userBox.setAttribute('class', 's-d1-d-d2-d');
            let userHeader = document.createElement('img');
            userHeader.setAttribute('class', 's-d1-d-d2-m');
            userHeader.setAttribute('src', 'img/26395177.jpeg');
            userBox.appendChild(userHeader);
            let userName = document.createElement('span');
            userName.setAttribute('class', 's-d1-d-d2-s');
            let un = document.createTextNode('长野原 美绪');
            userName.appendChild(un);
            userBox.appendChild(userName);
            userD.appendChild(userBox);
            outDiv.appendChild(userD);
            CONTAINER.appendChild(outDiv);

            arr.push('b' + index);

            index++;
        }

        let windowsHeight, bodyHeight, scrollTop = 0;

        function setImageUrl(i, url) {
            let img = document.getElementById(arr[i]).getElementsByTagName('img')[0];

            let image = new Image();
           image.src = 'img/' + url + '.jpg';
            img.setAttribute('src', image.src);
        }

        function createGroup(num) {
            for (let k = 0; k < num; k++) {
                createDom();
            }
        }

        function sort() {
            let length = arr.length;
            while (n <length) {
                if (n < column) {
                    document.getElementById(arr[n]).style.left = n * 246 + 'px';
                    leftArr.push(n * 246);
                    let height = document.getElementById(arr[n]).offsetHeight;
                    let top = document.getElementById(arr[n]).style.top;
                    heightArr.push(height);
                    topArr.push(top);
                    n++

                } else if (n >= column) {
                    let h = 0;
                    let min = Math.min(...heightArr);
                    while (min !== heightArr[h]) {
                        h++;
                    }
                    {
                        document.getElementById(arr[n]).style.left = leftArr[h] + 'px';
                        document.getElementById(arr[n]).style.top = heightArr[h] + 15 + 'px';
                        heightArr.splice(h, 1, heightArr[h] + 15 + document.getElementById(arr[n]).offsetHeight);
                    }
                    n++
                }
            }
        }

        window.addEventListener('load', function () {
            setTimeout(function () {
                sort();
                windowsHeight = window.innerHeight;
                bodyHeight = document.documentElement.scrollHeight;
                window.addEventListener('scroll', throttle(function () {
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    console.log(scrollTop);
                    if (bodyHeight - (scrollTop + windowsHeight) <= 1000) {

                        createGroup(30);
                        while(m<arr.length){
                            setImageUrl(m, randomNum(38));
                            m++
                        }
                        setTimeout(function () {
                            sort();
                            windowsHeight = window.innerHeight;
                            bodyHeight = document.documentElement.scrollHeight;
                        }, 200)
                    }
                }, 100, 1000));
            }, 0);

        });
    }
)();