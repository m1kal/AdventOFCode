module Main where

main = let din = "target area: x=143..177, y=-106..-71"
           xrange = [143,177]
           yrange = [-106,-71]
           attempts = filter snd $ concat $ map (\dx -> map (\dy -> result dx dy xrange yrange) [-107..200])  [1..200]
       in
         do
           print $ maximum $ map fst attempts 
           print $ length attempts 

result x y xrange yrange = (pk, fits xf yf xrange yrange) where [xf,yf,_,_,pk] = throw x y (last xrange) (head yrange)

fits x y [xmin,xmax] [ymin,ymax] = xmin <= x && x <= xmax && ymin <= y && y <= ymax

throw x y xmax ymin = last $ takeWhile (\pos -> (pos !! 0 <= xmax) && (pos !! 1 >= ymin)) $ iterate step [0,0,x,y,0]

step [x,y,dx,dy, peak] = [x+dx,y+dy,(if dx <= 0 then 0 else dx - 1), dy-1, max (y+dy) peak]

