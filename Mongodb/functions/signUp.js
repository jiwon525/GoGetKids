exports = async function(payload) {
    try {
        return{error:"payload"+payload};
    } catch (error) {
        // Handle any errors that occur during processing
        console.error("Error:", error.message);
        return { error: "Internal server error" };
    }
};
