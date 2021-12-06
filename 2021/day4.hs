module Main where

import Data.List

main = do input <- readFile "day4.txt"
          let rawNums:rawRows = lines input
              nums = read ("[" ++ rawNums ++ "]") :: [Int]
              rows = splitInput rawRows in
            do print $ parse input nums rows findMin
               print $ parse input nums rows findMax

parse l nums rows selectFunction = ans
          where (n, Just row) = selectFunction nums rows 0
                board = concat $ take 5 (drop (5 * (div row 5)) rows)
                unmarked = sum $ filter (\x -> not (elem x (take n nums))) board
                ans = unmarked * (nums !! (n - 1))

splitInput :: [String] -> [[Int]]
splitInput f | length f < 5 = []
             | otherwise = board ++ transpose board ++ splitInput (drop 6 f)
                           where board = map ((map read) . words) ( take 5 (drop 1 f))

bingo nums n = all (flip elem (take n nums))

findMin nums input n = if (any id b) then (n, elemIndex True b) else findMin nums input (n+1)
                       where b = map (bingo nums n) input


findMax nums input n = if (all (any id) boards) then
                          (n, (fmap (10*) $ elemIndex (True, False) (zip bingos previousBingos))) else
                          findMax nums input (n+1)
                       where b = map (bingo nums n) input
                             boards = split 10 b
                             bingos = map (any id) boards
                             previousBingos = map (any id) $ split 10 $ map (bingo nums (n-1)) input

split n x | length x <= n = [x]
          | otherwise = [take n x] ++ split n (drop n x)

