(function() {
  var questions = [{
    question: "Профиль деятельности Вашей компании",
    choices: [
      "мебельное производство",
      "судостроение",
      "автомобилестроение",
      "малые архитектурные формы",
      "производство тары и упаковки",
      "строительная компания",
      "торговая компания",
      "производство паркетной доски",
      "производство"
    ],
    correctAnswer: 2
  }, {
    question: "Тип материала который вас интересует",
    choices: [
      "детали из фанеры",
      "фанера ФК (1525 х 1525мм)",
      "фанера ФСФ(1220 х 2440мм, 1250 х 2500мм)",
      "фанера ФСФ (1500 х 3000мм, 1525 x 3050мм)",
      "ламинированная фанера ФСФ(1220 х 2440мм, 1250 х 2500мм)",
      "ламинированная фанера ФСФ (1500 х 3000мм, 1525 x 3050мм)",
    ],
    correctAnswer: 4
  }, {
    question: "Выберите толщины с которыми работаете",
    choices: ['3мм', '4мм', '6мм', '8мм', '9мм', '10мм', '12мм', '15мм', '18мм', '21мм', '24мм', '27мм', '30мм', '35-40мм'],
    correctAnswer: 0
  },
  {
    question: "Выберите сорта фанеры",
    choices: [
      'сорт I/II',
      'сорт II/II',
      'сорт II/III',
      'сорт II/IV',
      'сорт III/III',
      'сорт III/IV',
      'сорт IV/IV', 'фанера ТУ'
    ],
    correctAnswer: 3
  },
  {
    question: "Выберите объем",
    choices: ['от 10 до 30 м.куб.', 'от 30 до 90 м.куб.', 'от 90 м.куб. и более'],
    correctAnswer: 4
  },
  {
    question: "Укажите город доставки",
    choices: []
  }, {
    question: "Укажите название вашей компании",
    choices: []
  }];

  var textOptions = [
    'Профессионально обеспечивая прямые поставки березовой фанеры на различные производства и строительные объекты России мы гарантируем потребителю высочайшее качество продукции',
    'С момента основания нашего предприятия прошло 105 лет.',
    'Вся продукция предприятия выпускается на высокотехнологичном, высокопроизводительном оборудовании, что позволяет предприятию постоянно увеличивать показатель выпуска березовой фанеры.',
    'Более 70% производимой фанеры экспортируется на мировой рынок.',
    'Постоянными покупателями являются фирмы Италии, Египта,Турции.',
    '«Сертификаты качества» гарантируют качество парфинской фанеры.',
    ''
  ];

  var progressBarItems = [0, 14, 29, 43, 57, 71, 86];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var progress = $('#progress');
  var text = $('#text');
  var questionTitle = $('#questionTitle');
  var progressBarField = $('.progress-bar__field');
  var questionHeader = $('.question quiz__question question_variants');
  var question = $('#titleQuestion');
  var quizSidebar = $('.quiz__sidebar');

  const quizContainer = document.getElementById('quiz');

  quizContainer.addEventListener('click', e => {
    if (event.target.value) {
      $('#next').removeAttr('disabled');
    }
  });
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    quizSidebar.css('display', '');
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (selections.length >= 5) {
      quizSidebar.css('display', '');
      if (progressBarItems[questionCounter] === 71) {
        quizSidebar.css('display', 'none');
      } 
      questionCounter++;
      questionTitle.html(questions[questionCounter]);
      text.html(textOptions[questionCounter] );
      progress.html('Готово: ' + `<span class="progress-bar__number">${progressBarItems[questionCounter]}%</span>`);
      progressBarField.html(`<span style="width: ${progressBarItems[questionCounter]}%;"></span>`);
      displayNext();
    } 
    else if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      quizSidebar.css('display', '');
      questionCounter++;
      questionTitle.html(questions[questionCounter]);
      text.html(textOptions[questionCounter] );
      progress.html('Готово: ' + `<span class="progress-bar__number">${progressBarItems[questionCounter]}%</span>`);
      progressBarField.html(`<span style="width: ${progressBarItems[questionCounter]}%;"></span>`);

      displayNext();
    }
  });

  function remove() {
    $('#next').removeAttr('disabled');
  }
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    quizSidebar.css('display', '');
    questionTitle.html(questions[questionCounter]);
    text.html(textOptions[questionCounter]);
    progress.html('Готово: ' + `<span class="progress-bar__number">${progressBarItems[questionCounter]}%</span>`);
    progressBarField.html(`<span style="width: ${progressBarItems[questionCounter]}%;"></span>`);
    displayNext();
    $('#next').removeAttr('disabled');
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();

  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    question.html(`<div class="title quiz__question-title">${questions[index].question}</<div>`)
    questionHeader.append(question)
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<div class="answer-variants__group">');
    var item;
    var input = '';
    var inputOther = `<div
      class="answer-variants__textVariant answer-variants__other"
    >
      <label class="b-radio radio">
        <input type="radio" name="answer" value=' + ${i} + ' />
        <span class="check"></span>
        <div class="answer">
          <div class="answer__title"></div>
        </div>
      </label>
      <div class="field">
        <div class="control is-clearfix">
          <input type="text" placeholder="Другое..." class="input">
        </div>
      </div>
      </div>`;
    for (var i = 0; i < questions[index].choices.length; i++) {
      if (questions[index].choices.length) {
      item = $('<div class="answer-variants__textVariant">');
      input = '<label class="b-radio radio"><input type="radio" name="answer" value=' + i + ' /><span class="check"></span><div class="answer" style="padding-left: 10px;"><div class="answer__title">' + questions[index].choices[i] + '</div></div></label>';
      item.append(input);
      radioList.append(item);
    }
    }
    if (index <= 3) {
      radioList.append(inputOther)
    }
    return radioList;
  }

  function createInputElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    question.html(`<div class="title quiz__question-title">${questions[index].question}</<div>`);
    questionHeader.append(question);
    qElement.append('<div class="question quiz__question question_input" id="8b892366-6ca3-412e-8e97-aa08a41b4c8b" style="transform: translateX(0px); opacity: 1; transition: all 0.2s ease 0s;"><!----><!----><!----><div class="input-question"><div class="field"><!----> <div class="control is-clearfix"><input type="text" autocomplete="on" class="input is-large"></div></div></div></div>')
    return qElement;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    if (questionCounter <= 4) {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    else {
      var textInputFeedback = $('.input.is-large');
      selections[questionCounter] = textInputFeedback.val();
    }
  }
  
  // Displays next requested element
  function displayNext() {

    quiz.fadeOut(function() {
      $('#question').remove();
      $('#next').attr('disabled', 'true');
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        var nextInput = createInputElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        if (questionCounter >= 5) {
          $('#question').remove();
          $('#next').removeAttr('disabled');
          quiz.append(nextInput).fadeIn();
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
          $('#prev').removeAttr('disabled');
        } else if(questionCounter === 0){
          
          $('#prev').attr('disabled', 'true');
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        $('body').html(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').removeAttr('disabled');
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<section>');
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append(`<section>
    <div>
        <div>
            <div class="quiz__lead-form">
              <div class="container">
                <div class="final-page">
                  <div class="final-page__contacts">
                    <div class="final-page__header">
                      <span class="icon final-page__icon">
                        <i class="mdi mdi-check-circle-outline mdi-24px"></i>
                      </span>
                      <p class="title final-page__title">
                        <p>Как к вам обращаться?</p>
                        </p>
                    </div>
                    <div>
                      <div class="columns">
                        <div class="column is-7">
                        <div class="final-page__text content old">
                          <p>Последний шаг</p>
                        </div>
                        <div class="final-page__extra mb-2">
                          <div class="final-page__icon-container">
                            <span class="icon">
                              <i class="mdi mdi-gift mdi-24px"></i>
                            </span>
                          </div>
                          <div>
                            <p>Наш менеджер сможет обратиться к вам по имени!</p>
                          </div>
                        </div>
                      </div>
                      <div class="column is-5">
                        <form name="contacts" class="lead-form">
                          <div class="lead-form__fields">
                            <div class="step-fields">
                              <div class="field has-addons">
                              <label class="label">Введите имя</label>
                              <div class="control has-icons-left has-icons-right">
                                <input
                                  type="text"
                                  autocomplete="on"
                                  placeholder="Имя"
                                  required="required"
                                  id="name"
                                  class="input is-danger is-large"
                                >
                                  <span class="icon is-left is-medium">
                                    <i class="mdi mdi-account mdi-36px"></i>
                                  </span>
                                  <span class="icon is-right has-text-danger is-medium">
                                    <i class="mdi mdi-alert-circle mdi-36px"></i>
                                  </span>
                                </div>
                                <p class="help is-danger">Пожалуйста, заполните это поле</p>
                              </div>
                            </div>
                          </div>
                          <div class="lead-form__fields" style="display: none;">
                            <div class="messengers">
                              <div class="messengers__main">
                                <div class="messengers__title">Куда присылать результаты?</div>
                                <div class="messengers__list">
                                  <div class="messengers__item">
                                    <img
                                       class="messengers__icon"
                                    >
                                      <div class="messengers__name">Messenger</div>
                                  </div>
                                  <div class="messengers__item">
                                  <img
                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsd
                                    XN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5
                                    ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5P
                                    SIwcHgiCgkgdmlld0JveD0iMCAwIDI5MS4zNjQgMjkxLjM2NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkxLjM2NCAyOTEuMzY0OyIgeG1sOnNw
                                    YWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6IzAwQUZGMDsiIGQ9Ik0yODIuOTY2LDE3Ni42MTJjMi4wOTQtOS40OTUsMy4yMDQtMTkuMzA5LDM
                                    uMjA0LTI5LjQwNWMwLTc1LjY2MS02Mi4xOTctMTM3LjAxMS0xMzguOTQxLTEzNy4wMTEKCQljLTguMDkzLDAtMTYuMDMyLDAuNjkyLTIzLjc1MiwyLjAwM0MxMTEuMD
                                    YxLDQuNDc5LDk2LjM2NywwLDgwLjYxOCwwQzM2LjEwMSwwLDAuMDMyLDM1LjU3NywwLjAzMiw3OS40NzUKCQljMCwxNC42NTcsNC4wNTEsMjguMzg1LDExLjA3LDQwL
                                    jE5M2MtMS44NDgsOC44OTQtMi44MTMsMTguMTA3LTIuODEzLDI3LjUzOWMwLDc1LjY4OCw2Mi4xOTcsMTM0Ljc1MywxMzguOTMyLDEzNC43NTMKCQljOC42OTQsMCwxN
                                    y4xOTctMC43OTIsMjUuNDM2LTIuMjk0YzExLjM1Miw2LjAwOCwyNC4zMTYsMTEuNjk4LDM4LjA5OSwxMS42OThjNDQuNTA4LDAsODAuNTc3LTM1LjU2OCw4MC41NzctNz
                                    kuNDY2CgkJQzI5MS4zMzMsMTk5LjIzNSwyODguMzE5LDE4Ny4yNDUsMjgyLjk2NiwxNzYuNjEyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yMTA
                                    uNiwyMDMuMTMxYy01LjM2Miw3LjYyLTEzLjIxLDEzLjYxLTIzLjU0MiwxNy45MTZjLTEwLjMzMyw0LjM0Mi0yMi41NjgsNi40OTEtMzYuNzI0LDYuNDkxCgkJYy0xNi45N
                                    zgsMC0zMC45OC0yLjk1LTQyLjAyMy04Ljg1OGMtNy44MTEtNC4yNDItMTQuMTc0LTkuOTIzLTE5LjA3Mi0xNy4wMDZjLTQuODgtNy4wODMtNy4zMjgtMTMuOTgzLTcuMz
                                    I4LTIwLjY5MwoJCWMwLTMuODc4LDEuNDY2LTcuMjEsNC4zOTctOS45NjljMi45MzEtMi43OTUsNi42NzMtNC4xNjksMTEuMTk4LTQuMTY5YzMuNjc4LDAsNi44LDEuMDY
                                    1LDkuMzMxLDMuMjQxCgkJYzIuNTQ5LDIuMTU4LDQuNzI1LDUuMzUzLDYuNTA5LDkuNjA0YzIuMTk0LDUuMDUzLDQuNTUyLDkuMjY4LDcuMTEsMTIuNjQ1YzIuNTMxLDM
                                    uMzc3LDYuMTE4LDYuMTgxLDEwLjcyNCw4LjM3NQoJCWM0LjYyNSwyLjE3NiwxMC42OTcsMy4yODYsMTguMTk4LDMuMjg2YzEwLjMyNCwwLDE4LjcxNy0yLjIwMywyNS
                                    4xODEtNi42MzdjNi40NDUtNC40MTUsOS42ODYtOS45NTksOS42ODYtMTYuNTc4CgkJYzAtNS4yNDQtMS43NDgtOS41MzItNS4yMjYtMTIuNzgyYy0zLjQ4Ny0zLjI3N
                                    y03Ljk4NC01Ljc4MS0xMy41MDEtNy41MDFjLTUuNTA4LTEuNzM5LTEyLjg4Mi0zLjU3OC0yMi4xMzEtNS41MTcKCQljLTEyLjM1NC0yLjY0OS0yMi43MDUtNS43ODEt
                                    MzEuMDI1LTkuMzMxYy04LjMzLTMuNTc4LTE0Ljk1Ny04LjQzLTE5LjgzNy0xNC41NzVjLTQuODk4LTYuMTcyLTcuMzM4LTEzLjgxOS03LjMzOC0yMi45NQoJCWMwLTgu
                                    NzIxLDIuNTc2LTE2LjQ1LDcuNzQ3LTIzLjIxNGM1LjE2Mi02Ljc3MywxMi42MTgtMTEuOTcxLDIyLjQxMy0xNS42MTNjOS43NzctMy42NDEsMjEuMjg1LTUuNDUzLDM
                                    0LjQ5NC01LjQ1MwoJCWMxMC41NiwwLDE5LjcsMS4yMTEsMjcuNDExLDMuNjA1YzcuNzExLDIuNDIyLDE0LjA5Myw1LjYyNiwxOS4xNzIsOS42MjNjNS4wODksMy45OTcs
                                    OC44MTIsOC4xODQsMTEuMTUyLDEyLjU4MQoJCWMyLjM0OSw0LjM3LDMuNTIzLDguNjg1LDMuNTIzLDEyLjgzNmMwLDMuODE0LTEuNDU3LDcuMjc0LTQuMzg4LDEwLjMy
                                    NGMtMi45MzEsMy4wNTktNi41OTEsNC41OTctMTAuOTcsNC41OTcKCQljLTMuOTk3LDAtNy4wMjgtMC45MjktOS4xMDQtMi43NThjLTIuMDc2LTEuODM5LTQuMzI0LTQu
                                    ODQzLTYuNzM3LTkuMDIyYy0zLjE0MS01Ljk3Mi02Ljg4Mi0xMC42MzMtMTEuMjctMTMuOTc0CgkJYy00LjM4OC0zLjM1LTExLjQxNi01LjAyNS0yMS4xMjEtNS4wMjVj
                                    LTguOTg1LDAtMTYuMjUsMS44MDMtMjEuNzY3LDUuNDUzYy01LjUxNywzLjYyMy04LjI4NCw4LjAxMS04LjI4NCwxMy4xMTgKCQljMCwzLjE1LDAuOTU2LDUuODk5LDIu
                                    ODIyLDguMjAyYzEuODY2LDIuMzIxLDQuNDUyLDQuMjc5LDcuNzU2LDUuOTI3YzMuMjY4LDEuNjU3LDYuNiwyLjk1LDkuOTU5LDMuOTA1CgkJYzMuMzU5LDAuOTM4LDgu
                                    OTIyLDIuMjk0LDE2LjY3OCw0LjA5N2M5LjY4NiwyLjA4NSwxOC40NzEsNC4zOTcsMjYuMzM3LDYuOTFjNy44NTcsMi41MjIsMTQuNTU3LDUuNTksMjAuMDc0LDkuMTY3
                                    CgkJYzUuNTA4LDMuNjA1LDkuODIzLDguMTc1LDEyLjkwOSwxMy42OTJjMy4wODYsNS40OTksNC42NDMsMTIuMjQ0LDQuNjQzLDIwLjIzOEMyMTguNjM5LDE4Ni44OTks
                                    MjE1Ljk0NSwxOTUuNTAyLDIxMC42LDIwMy4xMzF6Ii8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+
                                    CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
                                    class="messengers__icon">
                                      <div class="messengers__name">Skype</div>
                                  </div>
                                </div>
                              </div>
                            </div
                          </div>
                          <button type="submit" class="lead-form__button button button_color_theme is-medium">
                            <span class="icon">
                              <i class="mdi mdi-checkbox-marked-circle-outline mdi-24px"></i>
                            </span>
                            <span>Отправить</span>
                            </button>
                            <div class="lead-form__agreement">
                              <label tabindex="0" class="b-checkbox checkbox">
                              <input type="checkbox" true-value="true" value="">
                              <span class="check"></span>
                              <span class="control-label">
                                С&nbsp;<a href="/agreement" target="_blank">политикой конфиденциальности</a>&nbsp;ознакомлен
                              </span>
                            </label>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</section>`);
    return score;
  }
})();