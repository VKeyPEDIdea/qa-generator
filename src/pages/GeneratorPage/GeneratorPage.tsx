import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Question from 'entities/Question';
import Button from 'shared/ui/Button';
import Table from 'shared/ui/Table';
import InputNumber from 'shared/ui/InputNumber';
import { useStore } from 'features/store';
import useQuestionList from './hooks/useQuestionList';
import { ActionBar, ActionBarItem, Container, TopNavigation } from './styled';

const GeneratorPage = () => {
  const [table, setTable] = useState<JSX.Element | null>(null);
  const [count, setCount] = useState(0);
  const {
    questions: {
      questionList,
      answerList,
      addAnswersByQuestionId,
      setQuestionTitleById,
      addQuestion,
      generateAnswersForTable,
      deleteAnswer,
      changeAnswerPercentage,
      deleteQuestion,
    },
  } = useStore();
  useQuestionList();

  const onGenerateTableHandler = () => {
    const content = [...generateAnswersForTable(count)];
    setTable(<Table content={content} />);
  };

  return (
    <Container>
      <TopNavigation>
        <Link to="/">
          <Button title="Назад в список" />
        </Link>
      </TopNavigation>
      {questionList.map((question, index) => {
        return (
          <Question
            key={question.id + question.title}
            {...question}
            serialNumber={index + 1}
            answerList={answerList.filter(
              ({ questionId }) => questionId === question.id,
            )}
            onTitleChange={setQuestionTitleById}
            onAnswerListChange={addAnswersByQuestionId}
            onDeleteAnswer={deleteAnswer}
            onPercentageChange={changeAnswerPercentage}
            onDeleteQuestion={deleteQuestion}
          />
        );
      })}
      <ActionBar>
        <ActionBarItem>
          <Button title="Добавить вопрос" onClick={addQuestion} />
        </ActionBarItem>
        <ActionBarItem>
          <Button
            title="Сгенерировать таблицу"
            onClick={onGenerateTableHandler}
          />
        </ActionBarItem>
        <ActionBarItem>
          <InputNumber
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
        </ActionBarItem>
      </ActionBar>
      {table}
    </Container>
  );
};

export default GeneratorPage;
