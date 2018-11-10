# Face 2 Emoji

## Summary
OpenCVを使って画像から顔認識を行い、😇に変換します。

## Usage

#### STEP1 Install OpenCV
```
pip install opencv-python -t .
```
or
```
pip install -r requirements.txt -t .
```

#### STEP2 Generate inputs and outputs directory.
```
mkdir inputs outpus
```

#### STEP3 Save inputs image
```
cp image.jpg /path_to_face-to-emoji/inputs/
```

#### STEP4 Run
```
python detect_face.py
```

```
curl -v --request POST -H "Accept: image/jpeg" -H "Content-Type: image/jpeg" --data-binary "@test.jpg" 'https://d65lnvm77i.execute-api.ap-northeast-1.amazonaws.com/dev' > sample.jpeg
```
