import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem, IonLabel, IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React , {useContext} from 'react';
import {useHistory} from "react-router-dom";

import './Home.css';

import {DUMMY_DATA} from './Courses'
import CourseContext from '../data/coursesContext';

const AllGoals: React.FC = () => {

    const coursesCtx = useContext(CourseContext);

    const goals = coursesCtx.courses.filter(course =>  {
        return course.included
    })
        .map(course => {
        return course.goals.map(goal => {
            return {
                ...goal,
                courseTitle: course.title
            };
        });
    }).reduce((goalArray,nestedGoals) => {
        let updatedGoalArray = goalArray;
        for(const goal of nestedGoals){
            updatedGoalArray = updatedGoalArray.concat(goal)
        }
        return updatedGoalArray;
    }, []);

    const history = useHistory();
    const changePageHandler = () => {
        history.push('/course-goals');
    };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
            </IonButtons>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">All Goals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            {goals.length === 0 && <h2>
                No goals found :(
            </h2>}
            {goals.length > 0 && (
                <IonList>
                    {goals.map(goal => (
                        <IonItem key={goal.id}>
                            <IonLabel>
                                <h2>
                                    {goal.courseTitle}
                                </h2>
                                <h3 color="secondary">
                                    {goal.text}
                                </h3>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            )}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
