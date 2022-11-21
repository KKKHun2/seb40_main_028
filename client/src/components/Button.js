import { useNavigate } from 'react-router-dom';
import { cls } from '../assets/utils';
import { ModalNum, isModal, totaltimeState} from '../state/states';
import { useRecoilState, useSetRecoilState } from 'recoil';

export default function Button({
  text,
  onGoBack,
  large,
  onGoMain,
  beforeModal,
  saveModal,
  workoutodone,
}) {
  const setIsModalOpen = useSetRecoilState(isModal);
  const [modalNum, setModalNum] = useRecoilState(ModalNum);
  const setIsdone = useSetRecoilState(totaltimeState);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goMain = () => {
    navigate('/');
  };
  const goBeforeModal = () => {
    setModalNum(modalNum - 1);
  };
  const goSaveModal = () => {
    setIsModalOpen(false);
    setModalNum(0);
  };
  const finishworkout = () => {
    setIsdone(0);
    navigate('/');
  }
  return (
    <button
      onClick={
        onGoBack
          ? goBack
          : onGoMain
          ? goMain
          : beforeModal
          ? goBeforeModal
          : saveModal
          ? goSaveModal
          : workoutodone
          ? finishworkout
          : null
      }
      className={cls(
        'px-9 py-2 bg-d-button hover:bg-d-button-hover text-white border border-transparent rounded-md shadow-sm font-medium',
        large ? 'text-xl' : 'text-lg'
      )}
    >
      {text}
    </button>
  );
}
