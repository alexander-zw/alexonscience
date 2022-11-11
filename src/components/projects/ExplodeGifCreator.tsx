import "../../styles/index.css";
import "../../styles/projects/ExplodeGifCreator.css";

import React, { ChangeEvent, createRef, useState } from "react";
import MetaTags from "../subcomponents/MetaTags";
import { Button, TextField, Tooltip } from "@material-ui/core";
// @ts-expect-error Library has no types.
import GIF from "./gif";
import explodeFrames from "../../images/explode_gif_creator/explode_frames";

const gifFlashDelays = [
    1100, 400, 600, 300, 400, 250, 250, 180, 160, 150, 130, 100, 90, 90, 80, 70, 60, 50, 50, 50, 50,
    40, 40, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 20,
];

/**
 * Allows the user to turn any image into an exploding gif (which can then be
 * turned into an emoji).
 */
const ExplodeGifCreator = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [outputGif, setOutputGif] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string>("#fff");
    const uploadedImageRef = createRef<HTMLImageElement>();
    const explodeGifFrameRefs = new Array(explodeFrames.length)
        .fill(undefined)
        .map(() => createRef<HTMLImageElement>());

    const selectedImageFromEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
        return target.files ? URL.createObjectURL(target.files[0]) : null;
    };

    const createGif = async () => {
        if (!selectedImage || !explodeGifFrameRefs[0].current) return;

        // @ts-expect-error Library has no types.
        const gif = new GIF({
            workers: 2,
            width: 25,
            height: 25,
            background: backgroundColor,
        });
        gif.on("finished", (outputBlob: Blob) => {
            setOutputGif(URL.createObjectURL(outputBlob));
        });

        const emptyFrame = explodeGifFrameRefs[explodeGifFrameRefs.length - 1].current;

        for (let i = 0; i < gifFlashDelays.length; i += 2) {
            gif.addFrame(uploadedImageRef.current, { delay: gifFlashDelays[i] });
            if (i + 1 >= gifFlashDelays.length) break;
            gif.addFrame(emptyFrame, { delay: gifFlashDelays[i + 1] });
        }

        explodeGifFrameRefs.forEach((frame) => gif.addFrame(frame.current, { delay: 100 }));

        gif.render();
    };

    const explodeFrameImgs = explodeFrames.map((frame, i) => (
        <img
            key={i}
            ref={explodeGifFrameRefs[i]}
            src={frame}
            alt={`explode gif frame ${i}`}
            width={"0em"}
        />
    ));

    const backgroundColorTooltip =
        'e.g. "#fff" or "rgb(0, 0, 0)"; if you want a transparent background you can try setting' +
        'the background to "#ccc" then using https://onlinegiftools.com/create-transparent-gif';

    return (
        <div className="text-div bottom-margin">
            <MetaTags
                path="/projects/explodegifcreator"
                additionalTag={<script src="gif.js/dist/gif.worker.js" type="text/javascript" />}
            />

            <p>
                Upload an 25x25 px image (preferably transparent background png) to turn it into an
                exploding gif!
            </p>

            <div className="upload-image-section">
                {selectedImage && (
                    <img
                        ref={uploadedImageRef}
                        src={selectedImage}
                        alt="uploaded image"
                        width={"40em"}
                    />
                )}

                <input
                    className="upload-button"
                    type="file"
                    accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|image/*"
                    name="uploaded-image"
                    onChange={(event) => setSelectedImage(selectedImageFromEvent(event))}
                />
            </div>

            {selectedImage && (
                <div className="convert-button-container">
                    <Button variant="contained" color="primary" size="small" onClick={createGif}>
                        Convert
                    </Button>

                    <Tooltip title={backgroundColorTooltip} placement="right">
                        <TextField
                            className="background-color-text-field"
                            label="background color"
                            value={backgroundColor}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                margin: "dense",
                            }}
                            onChange={({ target }) => setBackgroundColor(target.value)}
                        />
                    </Tooltip>

                    {explodeFrameImgs}
                </div>
            )}

            {outputGif && <img src={outputGif} alt="explodified gif" width={"100em"} />}
        </div>
    );
};

export default ExplodeGifCreator;
