import { TheoryBlocks } from "./TheoryBlocks";

export default function TheoryContent() {
  return (
    <div className="bg-white max-w-2xl text-left">
        <div className="mb-12">
            <h2 className="text-3xl font-medium text-gray-900 mb-2">What are recommender systems?</h2>
            <p className="text-gray-600 text-base">Core Problem: Given millions of items and thousands of users, how do we predict which items a specific user will like?</p>
        </div>
        <TheoryBlocks articlePath="/theory.md" />
    </div>
  );
}