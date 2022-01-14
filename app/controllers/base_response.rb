
class BaseResponse
    
    def initialize(psuccess,presult,perrorMsg)
        @success = psuccess
        @result = presult
        @errorMsg = perrorMsg
    end

    def success
        @success
    end

    def result
        @result
    end
    
    def errorMsg
        @errorMsg
    end

    def success=(success)
        @success = success
    end

    def result=(result)
        @result = result
    end

    def errorMsg=(errorMsg)
        @errorMsg = errorMsg
    end
end