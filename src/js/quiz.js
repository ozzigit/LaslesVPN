//variables-----------------------------------------------------------------------
let answer_radio_index = 0;
let draggin_obj;
let draggin_parent;

// collect a containers from template and remove teamplate from DOM---------------
let answer_template = document.querySelector('.answer').cloneNode(true);
document.querySelector('.answer').remove();
let question_template = document.querySelector('.question').cloneNode(true);
document.querySelector('.question').remove();
let quiz_template = document.querySelector('.quiz').cloneNode(true);
document.querySelector('.quiz').remove();

document.querySelector('.send').classList.add('hide');

//collect data
function collectData() {
    let data = [];
    //quiz
    for (quiz_el of document.querySelectorAll('.quiz')) {
        let quiz_questions = quiz_el.querySelectorAll('.question');
        let questins_arr = [];
        //questions
        for (question_el of quiz_questions) {
            let answers = question_el.querySelectorAll('.answer');
            let answers_arr = [];
            //answers
            for (answer_el of answers) {
                {
                    answers_arr.push({
                        answer: answer_el.querySelector('.answer_text').value,
                        is_right:
                            answer_el.querySelector('.form-check-input')
                                .checked,
                    });
                }
            }
            questins_obj = {};
            questins_obj[question_el.querySelector('.question_name').value] =
                answers_arr;
            questins_arr.push([questins_obj]);
        }
        quiz_obj = {};
        quiz_obj[quiz_el.querySelector('input.form-control').value] =
            questins_arr;
        data.push([quiz_obj]);
    }
    return data;
}

//listeners------------------------------------------------------------------------
document.addEventListener('click', function (e) {
    // Create quiz card
    if (e.target.classList.contains('createQuiz')) {
        let quizContainer = document.querySelector('.quizContainer');
        let quiz = quiz_template.cloneNode(true);
        quizContainer.append(quiz);

        //show send button
        document.querySelector('.send').classList.remove('hide');
    } else if (e.target.classList.contains('addQuestion')) {
        // create question card
        let question = question_template.cloneNode(true);
        e.target.parentNode.append(question);
    } else if (e.target.classList.contains('addAnswer')) {
        //create answer
        let answer = answer_template.cloneNode(true);

        answer_in_list = e.target.parentNode.querySelector('.answer');
        //if question exist in list
        if (answer_in_list) {
            answer.querySelector('.form-check-input').name =
                answer_in_list.querySelector('.form-check-input').name;
        } else {
            answer_radio_index += 1;
            answer.querySelector('.form-check-input').name +=
                answer_radio_index.toString();
        }

        e.target.parentNode.append(answer);
    } else if (e.target.classList.contains('btn-close')) {
        // Remove element button
        e.target.parentNode.remove();

        // hide send button
        let quiz_check = document.querySelector('.quiz');
        if (!quiz_check) {
            document.querySelector('.send').classList.add('hide');
        }
    } else if (e.target.classList.contains('send')) {
        // collect and send data
        let collected_data = collectData();
        console.log(JSON.stringify(collected_data));
        console.log(collected_data);
    }
});

document.addEventListener('dragstart', function (e) {
    e.target.classList.add('dragging');
    draggin_obj = e.target.cloneNode(true);
    draggin_parent = e.target.parentNode;
});

document.addEventListener('dragend', function (e) {
    e.target.classList.remove('dragging');
    // if (e.target != draggin_parent) {
        // console.log(draggin_parent.contains(e.target));
        // console.log(e.target)
    // }
});
document.addEventListener('dragleave', function (e) {
    // if (e.target != draggin_parent) {
        // console.log(draggin_parent.contains(e.target));
        // console.log(e.target);
    // }
});
document.addEventListener('dragover', function (e) {
    // if (e.target != draggin_parent) {
    // console.log(draggin_parent.contains(e.target));
    console.log(e.target)
    // }
});
//validators----------------------------------------------------------------------
function check_empty_quiz() {
    let flag_is_empty = false;
    for (quiz_el of document.querySelectorAll('.quiz')) {
        if (length(quiz_el.querySelector('.quiz_name').value) < 1) {
            flag_is_empty = true;
        }
    }
    return flag_is_empty;
}

function check_empty_question(elem) {
    let flag_is_empty = false;
    for (question_el of elem.querySelectorAll('.card.question')) {
        if (length(question_el.querySelector('.question_name').value) < 1) {
            flag_is_empty = true;
        }
    }
    return flag_is_empty;
}

