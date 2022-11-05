import "../../styles/index.css";
import "../../styles/projects/ExplodeGifCreator.css";

import React, { useState } from "react";
import MetaTags from "../subcomponents/MetaTags";

/**
 * Allows the user to turn any image into an exploding gif (which can then be
 * turned into an emoji).
 */
function ExplodeGifCreator() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    return (
        <div className="text-div bottom-margin">
            <MetaTags path="/projects/explodegifcreator" />

            <p>Upload an image (preferably a square png) to turn it into an exploding gif!</p>

            <div className="upload-image-section">
                {selectedImage && (
                    <img
                        className="uploaded-image-preview"
                        src={URL.createObjectURL(selectedImage)}
                        alt="uploaded image"
                        width={"40em"}
                    />
                )}

                <input
                    className="upload-button"
                    type="file"
                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    name="uploaded-image"
                    onChange={({ target }) => setSelectedImage(target.files?.[0] ?? null)}
                />
            </div>
        </div>
    );
}

export default ExplodeGifCreator;
