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
    let quizs = document.querySelectorAll('.quiz');
    //quiz
    for (quiz_el of quizs) {
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
            questins_arr.push([
                {
                    question_name:
                        question_el.querySelector('.question_name').value,
                },
                answers_arr,
            ]);
        }
        data.push([
            {
                quiz_name: quiz_el.querySelector('input.form-control').value,
            },
            questins_arr,
        ]);
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
        console.log(collected_data);
    }
});
