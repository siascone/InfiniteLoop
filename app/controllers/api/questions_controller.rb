class Api::QuestionsController < ApplicationController
    wrap_parameters include: Question.attribute_names + ['userId']
    def show 
        @question = Question.find_by(id: params[:id])
        render json: @question
    end

    def index
        @questions = Question.all
        render json: @questions
    end

    def create 
        @question = Question.create(question_params)
        @question.user_id = current_user.id

        if @question 
            render json: @question
        else
            render json: @question.errors.full_messages, status: 422
        end
    end

    def update
        debugger
        @question = Question.find_by(id: params[:id])

        if @question && @question.update(question_params)
            render json: @question
        else
            render json: ["Something went wrong"], status: 422
        end
    end

    def destroy
        question = Question.find_by(id: params[:id])
        question.destroy
        render json: ["Successfully removed question"], status: 200
    end

    private

    def question_params
        params.require(:question).permit(:title, :body, :user_id)
    end
end
