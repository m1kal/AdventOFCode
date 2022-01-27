module Main where

import qualified Data.List as L
import qualified Data.Set as S

main = do input <- readFile "day14.txt"
          let start = head $ lines input
              rules = map parse $ drop 2 $ lines input
              p1a = L.sort $ sumLetters $ head $ drop 10 $ iterate (step rules) $ sToInit start
              p2a = L.sort $ sumLetters $ head $ drop 40 $ iterate (step rules) $ sToInit start
            in
              do
                print $ (last p1a) - (head p1a)
                print $ (last p2a) - (head p2a)

parse line = [x, y] where [x,z,y] = words line

insertion rules elem@[x,y] = [x:last e, (last e)++[y]] where
                        Just e = L.find (\x -> head x == elem) rules

substep :: [[String]] -> (String,Int) -> [(String,Int)]
substep rules (x,l) = [(a, l), (b, l)] where [a,b] = insertion rules x

step :: [[String]] -> [(String,Int)] -> [(String,Int)]
step rules l = simplify $ L.sort $ concat $ map (substep rules) l

simplify :: [(String,Int)] -> [(String,Int)]
simplify (e:e1) | e1 == [] = [e]
                | (fst e) == (fst (head e1)) = simplify ((fst e,((snd e) + (snd (head e1)))):(tail e1))
                | otherwise = e:(simplify e1)

sToPairs v = map (\(a,b) -> [a,b]) $ zip v $ tail v

sToInit v = map (\x -> (x, 1)) $ sToPairs v

sumLetters v = foldl (\acc x -> (div (sumLetter v x) 2):acc) [] $ S.toList $ S.fromList $ concat $ map fst v

sumLetter :: [(String,Int)] -> Char -> Int
sumLetter v l = (sum $ map snd $ filter (\x -> l == head (fst x)) v) + (sum $ map snd $ filter (\x -> l == last (fst x)) v)

