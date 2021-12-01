module Main where

process :: [Int] -> Int
process input = length (filter (\a -> (fst a) < (snd a)) (zip input $ tail input))

threes :: [Int] -> [Int]
threes x = map (\(a,b,c)->a+b+c) (zip3 x (drop 1 x) (drop 2 x))

main = do s1 <- readFile "day1.txt"
          putStrLn $ show $ process $ map read $ lines s1
          putStrLn $ show $ process $ threes $ map read $ lines s1

