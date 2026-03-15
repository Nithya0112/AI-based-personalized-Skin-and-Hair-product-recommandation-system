from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

df = pd.read_csv("skincare_products_clean.csv")

@app.route("/products", methods=["GET"])
def get_products():

    skin_type = request.args.get("skin_type")
    max_price = request.args.get("price")

    filtered = df

    if skin_type:
        filtered = filtered[filtered["skin_type"].str.contains(skin_type, case=False)]

    if max_price:
        filtered = filtered[filtered["price"] <= float(max_price)]

    return jsonify(filtered.to_dict(orient="records"))


@app.route("/product/<int:id>", methods=["GET"])
def get_product(id):
    product = df.iloc[id].to_dict()
    return jsonify(product)


if __name__ == "__main__":
    app.run(debug=True)