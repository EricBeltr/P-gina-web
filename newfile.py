import cv2
import mediapipe as mp

# Inicializar la detección de pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Capturar video de la cámara
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
        if not ret:
                break

                    # Convertir a RGB para Mediapipe
                        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                            results = pose.process(rgb_frame)

                                # Crear fondo negro
                                    black_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                                        black_frame[:] = 0  # Hacerlo completamente negro

                                            # Dibujar un cuadro en el centro
                                                height, width = black_frame.shape
                                                    x1, y1 = width // 4, height // 4
                                                        x2, y2 = 3 * width // 4, 3 * height // 4
                                                            cv2.rectangle(black_frame, (x1, y1), (x2, y2), (255, 255, 255), 2)

                                                                # Si detecta una persona, dibujar puntos
                                                                    if results.pose_landmarks:
                                                                            for lm in results.pose_landmarks.landmark:
                                                                                        x, y = int(lm.x * width), int(lm.y * height)
                                                                                                    cv2.circle(black_frame, (x, y), 3, (255, 255, 255), -1)

                                                                                                        # Mostrar el resultado
                                                                                                            cv2.imshow('Detección de Movimiento', black_frame)

                                                                                                                if cv2.waitKey(1) & 0xFF == ord('q'):
                                                                                                                        break

                                                                                                                        cap.release()
                                                                                                                        cv2.destroyAllWindows()