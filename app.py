from flask import Flask, render_template, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load trained model
model = joblib.load("gradient_boosting_model.pkl")

# Load feature names
feature_columns = joblib.load("feature_columns.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    input_data = {
        "Area_sqft": data["Area_sqft"],
        "Bedrooms": data["Bedrooms"],
        "Bathrooms": data["Bathrooms"],
        "Parking": data["Parking"],
        "Floor": data["Floor"],
        "Total_Floors": data["Total_Floors"],
        "Property_Age": data["Property_Age"],
        "City": data["City"],
        "Property_Type": data["Property_Type"],
        "Furnishing": data["Furnishing"]
    }

    input_df = pd.DataFrame([input_data])

    input_df = pd.get_dummies(input_df)

    input_df = input_df.reindex(
        columns=feature_columns,
        fill_value=0
    )

    prediction = model.predict(input_df)[0]

    return jsonify({
        "prediction": round(float(prediction), 2)
    })


if __name__ == "__main__":
    app.run(debug=True)