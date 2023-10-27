from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api

app = Flask(__name__)
CORS(app)
api = Api(app)

class HelloResource(Resource):
    def get(self):
        return {"message": "Hello, welcome to the API!"}

api.add_resource(HelloResource, "/hello")


if __name__ == "__main__":
    app.run(debug=True)
    