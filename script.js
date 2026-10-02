const questions = [

    {
        question:
            "Qual é a principal característica da avaliação formativa?",

        options: [
            "Atribuir uma nota final ao estudante.",
            "Acompanhar o processo de aprendizagem e fornecer feedback.",
            "Classificar os estudantes de acordo com seu desempenho.",
            "Avaliar somente o conteúdo apresentado no final do curso."
        ],

        correct: 1,

        feedbackCorrect:
            "Correto! A avaliação formativa acompanha o processo de aprendizagem e utiliza informações obtidas durante esse processo para orientar o estudante.",

        feedbackIncorrect:
            "A alternativa correta é a segunda. A avaliação formativa tem como objetivo acompanhar a aprendizagem e fornecer informações que ajudem a melhorar o processo."
    },


    {
        question:
            "Qual é uma diferença importante entre avaliação formativa e avaliação somativa?",

        options: [
            "A avaliação formativa acontece apenas no final do curso.",
            "A avaliação somativa não pode utilizar questões.",
            "A avaliação formativa acompanha o processo, enquanto a somativa geralmente verifica resultados ao final de uma etapa.",
            "Não existe diferença entre elas."
        ],

        correct: 2,

        feedbackCorrect:
            "Correto! A avaliação formativa ocorre ao longo do processo e pode orientar intervenções, enquanto a avaliação somativa normalmente verifica os resultados alcançados ao final de uma etapa.",

        feedbackIncorrect:
            "A alternativa correta é a terceira. A avaliação formativa acompanha o processo de aprendizagem, enquanto a avaliação somativa costuma verificar os resultados ao final de uma etapa."
    },


    {
        question:
            "Como um quiz pode contribuir para a avaliação formativa?",

        options: [
            "Somente atribuindo uma nota ao estudante.",
            "Fornecendo informações sobre dificuldades e permitindo feedback.",
            "Substituindo completamente o professor.",
            "Impedindo que o estudante revise o conteúdo."
        ],

        correct: 1,

        feedbackCorrect:
            "Correto! Um quiz pode identificar dificuldades e oferecer feedback imediato, permitindo que o estudante reconheça seus erros e revise o conteúdo.",

        feedbackIncorrect:
            "A alternativa correta é a segunda. O quiz pode funcionar como instrumento formativo quando seus resultados são utilizados para fornecer feedback e orientar a aprendizagem."
    },


    {
        question:
            "Qual pode ser uma utilização da Inteligência Artificial na criação de avaliações?",

        options: [
            "Gerar sugestões de questões e feedbacks.",
            "Substituir completamente o processo de avaliação.",
            "Garantir que todas as respostas dos estudantes estejam corretas.",
            "Eliminar a necessidade de objetivos de aprendizagem."
        ],

        correct: 0,

        feedbackCorrect:
            "Correto! A IA pode auxiliar na elaboração de questões, alternativas e sugestões de feedback, mas o professor deve revisar e validar o material produzido.",

        feedbackIncorrect:
            "A alternativa correta é a primeira. A IA pode auxiliar na criação de questões e feedbacks, mas o conteúdo gerado precisa ser revisado pelo professor."
    },


    {
        question:
            "Por que o feedback imediato pode ser importante em um quiz?",

        options: [
            "Porque permite ao estudante compreender seus erros enquanto o conteúdo ainda está recente.",
            "Porque elimina a necessidade de estudar.",
            "Porque transforma automaticamente qualquer avaliação em avaliação somativa.",
            "Porque impede novas tentativas."
        ],

        correct: 0,

        feedbackCorrect:
            "Correto! O feedback imediato permite que o estudante compreenda sua resposta, identifique possíveis erros e retome o conteúdo quando necessário.",

        feedbackIncorrect:
            "A alternativa correta é a primeira. O feedback imediato ajuda o estudante a compreender seus erros e pode orientar a revisão do conteúdo."
    },


    {
        question:
            "Ao utilizar IA para criar uma avaliação, qual atitude do professor é recomendada?",

        options: [
            "Publicar automaticamente todo conteúdo produzido pela IA.",
            "Não verificar as respostas geradas.",
            "Revisar as questões, verificar sua precisão e alinhá-las aos objetivos de aprendizagem.",
            "Permitir que a IA atribua todas as notas sem supervisão."
        ],

        correct: 2,

        feedbackCorrect:
            "Correto! A IA deve ser utilizada como ferramenta de apoio. O professor precisa revisar o conteúdo, verificar sua precisão e garantir o alinhamento aos objetivos.",

        feedbackIncorrect:
            "A alternativa correta é a terceira. O professor deve revisar e validar o material produzido pela IA antes de utilizá-lo com estudantes."
    }

];


let score = 0;

let answered = 0;


function loadQuiz() {

    const container = document.getElementById("quiz-container");

    container.innerHTML = "";

    score = 0;

    answered = 0;


    questions.forEach((question, questionIndex) => {

        const card = document.createElement("div");

        card.className = "question-card";


        const number = document.createElement("div");

        number.className = "question-number";

        number.textContent =
            `QUESTÃO ${questionIndex + 1} DE ${questions.length}`;


        const title = document.createElement("h3");

        title.textContent = question.question;


        card.appendChild(number);

        card.appendChild(title);


        question.options.forEach((option, optionIndex) => {

            const button = document.createElement("button");

            button.className = "option";

            button.textContent = option;

            button.addEventListener(
                "click",
                () => selectAnswer(
                    questionIndex,
                    optionIndex,
                    card
                )
            );

            card.appendChild(button);

        });


        const feedback = document.createElement("div");

        feedback.className = "feedback";


        card.appendChild(feedback);

        container.appendChild(card);

    });

}


function selectAnswer(
    questionIndex,
    selectedIndex,
    card
) {

    const question = questions[questionIndex];

    const buttons =
        card.querySelectorAll(".option");

    const feedback =
        card.querySelector(".feedback");


    if (buttons[0].disabled) {
        return;
    }


    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selectedIndex === question.correct) {

        buttons[selectedIndex].classList.add("correct");

        feedback.classList.add(
            "show",
            "correct-feedback"
        );

        feedback.textContent =
            "✓ " + question.feedbackCorrect;

        score++;

    } else {

        buttons[selectedIndex].classList.add("incorrect");

        buttons[question.correct].classList.add("correct");

        feedback.classList.add(
            "show",
            "incorrect-feedback"
        );

        feedback.textContent =
            "✕ " + question.feedbackIncorrect;

    }


    answered++;


    if (answered === questions.length) {

        setTimeout(showResult, 500);

    }

}


function showResult() {

    const result =
        document.getElementById("quiz-result");

    const scoreElement =
        document.getElementById("score");

    const message =
        document.getElementById("result-message");


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    scoreElement.innerHTML =
        `<strong>Você acertou ${score} de ${questions.length} questões (${percentage}%).</strong>`;


    if (percentage >= 80) {

        message.textContent =
            "Excelente! Você demonstrou uma boa compreensão dos conceitos trabalhados no minicurso.";

    } else if (percentage >= 60) {

        message.textContent =
            "Bom resultado! Você compreendeu grande parte dos conceitos, mas pode revisar alguns pontos do conteúdo.";

    } else {

        message.textContent =
            "Recomendamos revisar a videoaula e tentar novamente, especialmente os conceitos relacionados à avaliação formativa e ao uso da IA.";

    }


    result.style.display = "block";

    result.scrollIntoView({
        behavior: "smooth"
    });

}


function restartQuiz() {

    document.getElementById("quiz-result").style.display = "none";

    loadQuiz();

    document.getElementById("quiz").scrollIntoView({
        behavior: "smooth"
    });

}


loadQuiz();