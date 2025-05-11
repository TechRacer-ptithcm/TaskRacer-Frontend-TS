import { call, takeLatest, delay } from 'redux-saga/effects';
import { checkpointPomodoro } from '../services/pomodoro.service';
import { checkpointPomodoroThunk } from '../actions/pomodoro.actions';

function* checkpointSaga() {
  while (true) {
    try {
      yield call(checkpointPomodoro);
    } catch (error) {
      console.error('Checkpoint failed:', error);
    }
    yield delay(5 * 60 * 1000);
  }
}

export function* pomodoroSaga() {
  yield takeLatest(checkpointPomodoroThunk.fulfilled, checkpointSaga);
}